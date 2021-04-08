import itemsJson from './items.json';
import { ItemEntry, ItemsJson } from './types';

const items = (itemsJson as ItemsJson).items;
const itemStrMap = new Map(items.map(x => [x.strId, x]));
const itemNumMap = new Map(items.map(x => [x.id, x]));

export function getItem(id: string | number): ItemEntry {
    let e: ItemEntry | undefined;
    if (typeof id === 'string')
        e = itemStrMap.get(id);
    else
        e = itemNumMap.get(id);
    if (!e) throw new Error(`Mapping for item ${id} not found`);
    return e;
}