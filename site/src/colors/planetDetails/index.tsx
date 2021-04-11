import React, { useCallback, useMemo } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ColorEntry, WorldEntry } from "../data/types";
import { Header } from "../../misc/header";
import { Layout, Content } from "../../misc/layout";
import { useQuery } from "../../misc/useQuery";
import { createUseStyles } from "react-jss";
import { ColorBlock } from "./colorBlock";
import { columnsToDefs, PlantColumns, RockColumns, ShroomColumns, SoilColumns, WoodColumns } from "../grouping";

interface Props {
    colors: Map<number, ColorEntry>;
    worlds: WorldEntry[];
}

interface Params {
    id: string;
    back: string;
}
const useStyles = createUseStyles({
    info: {
        display: "flex",
        alignItems: "center",
        margin: "1em",
        "& img": {
            height: "8em",
            width: "8em",
            marginRight: "1em",
        },
    },
    table: {
        fontWeight: 400,
        borderSpacing: 0,
        cursor: "default",
        textAlign: "left",
        margin: "1em",
        "& caption": {
            fontSize: "120%",
            fontWeight: "bold",
            textAlign: "left",
            paddingBottom: "0.5em",
        },
        "& th, td": {
            border: "solid #ccc 1px",
            padding: "2px",
        },
    },
});

export const PlanetDetails: React.FC<Props> = ({ colors, worlds }) => {
    const classes = useStyles();
    const { id } = useParams<Params>();
    const back = useQuery("back");

    const history = useHistory();
    const planet = useMemo(() => worlds.find(x => x.id === parseInt(id)), [worlds, id]);

    const showColor = useCallback((id: number) => {
        history.push(`/colors/details/${id}${back ? "?back=" + back : ""}`);
    }, [back, history]);

    if (!planet) {
        history.push("/colors");
        return null;
    }

    return <>
        <Layout>
            <Header title={planet.name} back={back || "/colors"}>
                <Link to={back || "/colors"}>Back to table</Link>
            </Header>
            <Content>
                <div className={classes.info}>
                    {planet.image && <img src={planet.image} />}
                    <div>
                        <div><b>Planet:</b> {planet.name}</div>
                        <div><b>Class:</b> {planet.class}</div>
                        <div><b>Tier:</b> {planet.tier + 1}</div>
                        <div><b>Type:</b> {planet.type.toString().charAt(0).toUpperCase() + planet.type.toString().slice(1).toLowerCase()}</div>
                        <div><b>Region:</b> {planet.region.toUpperCase()}</div>
                    </div>
                </div>
                <table className={classes.table}>
                    <ColorBlock title="Rocks" planet={planet} items={columnsToDefs(RockColumns)} colors={colors} colorDetails={showColor} />
                    <ColorBlock title="Soil" planet={planet} items={columnsToDefs(SoilColumns)} colors={colors} colorDetails={showColor} />
                    <ColorBlock title="Trees" planet={planet} items={columnsToDefs(WoodColumns)} colors={colors} colorDetails={showColor} />
                    <ColorBlock title="Plants" planet={planet} items={columnsToDefs(PlantColumns)} colors={colors} colorDetails={showColor} />
                    <ColorBlock title="Shrooms" planet={planet} items={columnsToDefs(ShroomColumns)} colors={colors} colorDetails={showColor} />
                </table>
            </Content>
        </Layout>
    </>;
};