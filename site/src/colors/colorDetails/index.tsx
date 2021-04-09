import React, { useCallback, useMemo } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ColorEntry, WorldClass, WorldEntry } from "../data/types";
import { Header } from "../../misc/header";
import { Layout, Content } from "../../misc/layout";
import { useQuery } from "../../misc/useQuery";
import { ColorBox } from "./colorBox";
import { getItem } from "../data/items";
import { FoundTable, FoundLocation } from "./foundTable";
import { createUseStyles } from "react-jss";
import { deltaE } from "./colorDiff";

interface Props {
    colors: Map<number, ColorEntry>;
    worlds: WorldEntry[];
}

interface Params {
    id: string;
    back: string;
}

function sortLocations(found: FoundLocation[]): void {
    found.sort((a, b) => (a.world.tier - b.world.tier) || a.world.name.localeCompare(b.world.name));
}

const useStyles = createUseStyles({
    top: {
        display: "flex",
        margin: "1em",
    },
    similar: {
        marginLeft: "1em",
        "& h2": {
            margin: "0.25em",
        },
    },
    colors: {
        display: "flex",
        fontSize: "75%",
        "& > *": {
            margin: "0 0.5em",
        },
    },
});

export const ColorDetails: React.FC<Props> = ({ colors, worlds }) => {
    const classes = useStyles();
    const { id } = useParams<Params>();
    const back = useQuery("back");

    const history = useHistory();
    const color = useMemo(() => colors.get(parseInt(id)), [colors, id]);

    const changeColor = useCallback((id: number) => () => {
        history.push(`/colors/details/${id}${back ? "?back=" + back : ""}`);
    }, [back, history]);

    const [foundHome, foundExo, foundSov] = useMemo(() => {
        const foundHome: FoundLocation[] = [];
        const foundExo: FoundLocation[] = [];
        const foundSov: FoundLocation[] = [];

        if (color) {
            for (const world of worlds) {
                for (const idStr in world.colors) {
                    if (world.colors[idStr] === color.id) {
                        if (world.class === WorldClass.Homeworld)
                            foundHome.push({ world: world, item: getItem(parseInt(idStr)) });
                        else if (world.class === WorldClass.Exoworld)
                            foundExo.push({ world: world, item: getItem(parseInt(idStr)) });
                        else if (world.class === WorldClass.Sovereign)
                            foundSov.push({ world: world, item: getItem(parseInt(idStr)) });
                    }
                }
            }

            sortLocations(foundHome);
            sortLocations(foundExo);
            sortLocations(foundSov);
        }

        return [foundHome, foundExo, foundSov];
    }, [worlds, color]);

    const similar = useMemo(() => {
        if (!color) return [];
        const colorsWithDistance: [number, ColorEntry][] = Array.from(colors.values()).filter(x => x.id !== color.id).map(c => [deltaE(c.rgb, color.rgb), c]);
        colorsWithDistance.sort((a, b) => a[0] - b[0]);
        return colorsWithDistance.slice(0, 10).map(x => x[1]);
    }, [color, colors]);

    if (!color) {
        history.push("/colors");
        return null;
    }

    return <>
        <Layout>
            <Header title={color.name} back={back || "/colors"}>
                <Link to={back || "/colors"}>Back to table</Link>
            </Header>
            <Content>
                <div className={classes.top}>
                    <ColorBox color={color} />
                    <div className={classes.similar}>
                        <h2>Similar:</h2>
                        <div className={classes.colors}>
                            {similar.map((c) => <ColorBox color={c} key={c.id} click={changeColor(c.id)} />)}
                        </div>
                    </div>
                </div>
                <FoundTable locations={foundHome} title="Found on Home Planets:" />
                <FoundTable locations={foundExo} title="Found on Exo Planets:" />
                <FoundTable locations={foundSov} title="Found on Sovereign Planets:" />
            </Content>
        </Layout>
    </>;
};