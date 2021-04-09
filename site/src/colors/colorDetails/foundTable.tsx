import React from "react";
import { createUseStyles } from "react-jss";
import { itemImage } from "../data/items";
import { ItemEntry, WorldClass, WorldEntry } from "../data/types";

export interface FoundLocation {
    world: WorldEntry;
    item: ItemEntry;
}

interface Props {
    locations: FoundLocation[];
    title: string;
}

const useStyles = createUseStyles({
    table: {
        fontWeight: 400,
        borderSpacing: 0,
        cursor: "default",
        textAlign: "left",
        margin: "1em",
        borderCollapse: "collapse",
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
    worldName: {
        maxWidth: "8em",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    worldTier: {
        textAlign: "center",
    },
    item: {
        display: "flex",
        alignItems: "center",
        "& img": {
            height: "2em",
            width: "2em",
        },
    },
});

export const FoundTable: React.FC<Props> = ({ locations, title }) => {
    const classes = useStyles();

    if (locations.length === 0) return null;
    return <table className={classes.table}>
        <caption>{title}</caption>
        <thead>
            <tr>
                <th className={classes.worldTier} >T</th>
                <th className={classes.worldName} >World</th>
                <th>Type</th>
                <th>Region</th>
                <th>Item</th>
            </tr>
        </thead>
        <tbody>
            {locations.map(loc => <tr key={`${loc.world.id}-${loc.item.id}`}>
                <td className={classes.worldTier}>{loc.world.tier + 1}{loc.world.class === WorldClass.Exoworld ? "X" : ""}</td>
                <td className={classes.worldName} title={loc.world.name}>{loc.world.name}</td>
                <td>{loc.world.type.toString().charAt(0).toUpperCase() + loc.world.type.toString().slice(1).toLowerCase()}</td>
                <td>{loc.world.region.toUpperCase()}</td>
                <td><div className={classes.item}><img src={itemImage(loc.item)} /><span>{loc.item.name}</span></div></td>
            </tr>)}
        </tbody>
    </table>;
};