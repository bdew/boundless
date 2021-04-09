import React, { useCallback, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ColorEntry, WorldClass, WorldEntry, WorldRegion } from "./data/types";
import { SoilColumns, PlantColumns, RockColumns, WoodColumns, ShroomColumns } from "./grouping";
import { Switcher } from "../misc/switcher";
import { ColorsTable } from "./colorTable";
import { Header } from "../misc/header";
import { Layout, Content } from "../misc/layout";

type DisplayClass = "main" | "sov";
type DisplayGroup = "rocks" | "soil" | "trees" | "plants" | "shrooms";

interface Props {
    colors: Map<number, ColorEntry>;
    worlds: WorldEntry[];
}

interface Params {
    wclass: DisplayClass;
    group: DisplayGroup;
    region: WorldRegion;
}

export const ColorViewer: React.FC<Props> = ({ colors, worlds }) => {
    const { wclass, group, region } = useParams<Params>();

    const filtered = useMemo(() => {
        let data = worlds;

        if (wclass === "sov")
            data = data.filter(x => x.class === WorldClass.Sovereign);
        else
            data = data.filter(x => x.class === WorldClass.Homeworld || x.class === WorldClass.Exoworld);

        if (region) data = data.filter(x => x.region === region);

        data = data.sort((a, b) => (a.tier - b.tier) || a.name.localeCompare(b.name));

        return data;
    }, [worlds, wclass, region]);

    const history = useHistory();

    const setDisplay = useCallback((wclass: DisplayClass, group: string, region: WorldRegion | null) => {
        history.push(`/colors/${wclass}/${group}${region ? "/" + region : ""}`);
    }, [history]);

    const columns = useMemo(() => {
        switch (group) {
            case "rocks": return RockColumns;
            case "plants": return PlantColumns;
            case "trees": return WoodColumns;
            case "soil": return SoilColumns;
            case "shrooms": return ShroomColumns;
            default: return [];
        }
    }, [group]);

    return <>
        <Layout>
            <Header title="Boundless Color Viewer">
                <Switcher<DisplayGroup>
                    name="Type:"
                    value={group || "rocks"}
                    setValue={g => setDisplay(wclass, g, region)}
                    options={[["rocks", "Rocks"], ["soil", "Soil"], ["trees", "Trees"], ["plants", "Plants"], ["shrooms", "Mushrooms"]]}
                />
                <Switcher
                    name="Region:"
                    value={region || null}
                    setValue={r => setDisplay(wclass, group, r)}
                    options={[[null, "All"], [WorldRegion.EUC, "EUC"], [WorldRegion.USE, "USE"], [WorldRegion.USW, "USW"], [WorldRegion.AUS, "AUS"]]}
                />
                <Switcher<DisplayClass>
                    name="Class:"
                    value={wclass || "main"}
                    setValue={c => setDisplay(c, group, region)}
                    options={[["main", "Home/Exo"], ["sov", "Sovereign"]]}
                />
            </Header>
            <Content>
                <ColorsTable colors={colors} worlds={filtered} region={region} columns={columns} />
            </Content>
        </Layout>
    </>;
};