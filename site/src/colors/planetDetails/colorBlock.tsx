import React, { useMemo } from "react";
import { createUseStyles } from "react-jss";
import { ColorCell } from "../colorTable/cell";
import { itemImage } from "../data/items";
import { ItemEntry, WorldEntry, ColorEntry } from "../data/types";

interface Props {
    planet: WorldEntry;
    title: string;
    items: ItemEntry[];
    colors: Map<number, ColorEntry>;
    colorDetails: (id: number) => void;
}

const useStyles = createUseStyles({
    item: {
        display: "flex",
        alignItems: "center",
        "& img": {
            height: "2em",
            width: "2em",
        },
    },
    gap: {
        borderLeft: "none !important",
        borderBottom: "none !important",
        width: "3em",
    },
    title: {
        borderLeft: "none !important",
        borderRight: "none !important",
        borderTop: "none !important",
        paddingTop: "1em !important",
    },
});

export const ColorBlock: React.FC<Props> = ({ planet, title, items, colors, colorDetails }) => {
    const classes = useStyles();
    const filtered = useMemo(() => items.filter(item => planet.colors[item.id.toString()]), [items, planet]);
    return <>
        <tr>
            <th className={classes.title} colSpan={3}>{title}</th>
        </tr>
        {filtered.map((item, n) =>
            <tr key={item.id}>
                {n === 0 && <td rowSpan={filtered.length} className={classes.gap} />}
                <td><div className={classes.item}><img src={itemImage(item)} /><span>{item.name}</span></div></td>
                <ColorCell colors={colors} blocks={planet.colors} type={item.id.toString()} colorDetails={colorDetails} />
            </tr>
        )}
    </>;
};