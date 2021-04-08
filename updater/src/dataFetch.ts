import { BlockColors, Color, Item, World, WorldClass, WorldRegion } from "./apiTypes";
import { downloadFile, fetchData, fetchPaged } from "./download";
import { ColorEntry, ItemEntry, WorldEntry } from "./outputTypes";
import ColorApi from "color";
import ProgressBar from "progress";

const COLORS_TTL = Number.MAX_VALUE;
const WORLD_LIST_TTL = 15 * 60 * 1000;
const WORLDS_EXO_TTL = Number.MAX_VALUE;
const WORLDS_SOV_TTL = 12 * 60 * 60 * 1000;
const WORLDS_HOME_TTL = Number.MAX_VALUE;
const ITEM_TTL = Number.MAX_VALUE;

export async function getWorlds(): Promise<WorldEntry[]> {
    const worlds: World[] = await fetchPaged('https://api.boundlexx.app/api/v1/worlds/?limit=1000', WORLD_LIST_TTL);
    console.log(`Loaded ${worlds.length} worlds`);
    const bar = new ProgressBar('Fetching world colorss: :bar :current/:total', { total: worlds.length, width: 20, clear: true });
    const result: WorldEntry[] = [];

    for (const world of worlds) {
        bar.tick();
        if (!world.active || world.is_locked || world.world_class === WorldClass.Creative || world.region === WorldRegion.SANDBOX) continue;
        const colorData: BlockColors = await fetchData(`https://api.boundlexx.app/api/v1/worlds/${world.id}/block-colors/`,
            world.world_class === WorldClass.Exoworld ? WORLDS_EXO_TTL : world.world_class === WorldClass.Sovereign ? WORLDS_SOV_TTL : WORLDS_HOME_TTL);
        if (colorData.block_colors.length === 0) continue;

        result.push({
            id: world.id,
            class: world.world_class,
            name: world.text_name,
            region: world.region,
            type: world.world_type,
            tier: world.tier,
            colors: Object.fromEntries(colorData.block_colors.map(e => [e.item.game_id.toString(), e.color.game_id]))
        })
    }

    console.log(`Processed ${result.length} world entries`);

    return result;
}

export async function getColors(): Promise<ColorEntry[]> {
    const colors: Color[] = await fetchPaged('https://api.boundlexx.app/api/v1/colors/?limit=256', COLORS_TTL);
    console.log(`Loaded ${colors.length} colors`);

    return colors.map(e => ({
        id: e.game_id,
        name: e.localization.find(x => x.lang === 'english')?.name || '?',
        color: e.base_color,
        gleam: e.gleam_color,
        light: new ColorApi(e.base_color).isLight()
    }));
}

function coloredItemIds(worlds: WorldEntry[]): Set<number> {
    const result = new Set<number>();
    worlds.flatMap(x => Object.keys(x.colors).map(x => parseInt(x))).forEach((id) => result.add(id));
    return result;
}

export async function getItems(): Promise<ItemEntry[]> {
    const result: ItemEntry[] = [];
    const coloredItems = coloredItemIds(await getWorlds());
    const bar = new ProgressBar('Fetching items: :bar :current/:total', { total: coloredItems.size, width: 20, clear: true });

    for (const id of coloredItems) {
        if (isNaN(id)) throw new Error();
        bar.tick();
        const itemData: Item = await fetchData(`https://api.boundlexx.app/api/v1/items/${id}/`, ITEM_TTL);
        result.push({
            id: itemData.game_id,
            strId: itemData.name,
            name: itemData.localization.find(x => x.lang === 'english')?.name || '?',
        })

        let imageFile = itemData.name;

        if (imageFile.startsWith('GRASS_')) imageFile = imageFile.replace('GRASS_', 'ITEM_SEED_').replace('_BASE', 'GRASS');

        await downloadFile(`https://butt.boundless.mayumi.fi/img/items/${imageFile}.png`, `out/img/${itemData.name}.png`);
    }

    console.log(`Processed ${result.length} item entries`);

    return result;
}