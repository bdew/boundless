import React from "react";
import { createUseStyles } from "react-jss";
import { ColorCells } from "./cells";
import { ColorEntry, WorldClass, WorldEntry, WorldRegion } from "../data/types";
import { ItemColumn } from "../grouping";
import { ColumnHeaders, ColumnSubHeaders } from "./headers";

interface Props {
    region?: WorldRegion;
    columns: ItemColumn[];
    colors: Map<number, ColorEntry>;
    worlds: WorldEntry[];
    colorDetails: (id: number)=>void;
}

const useStyles = createUseStyles({
    table: {
        tableLayout: "fixed",
        fontSize: "0.75em",
        fontWeight: 500,
        borderSpacing: 0,
        cursor: "default",
        textAlign: "left",
        "& th, td": {
            border: "solid #ccc 1px",
            padding: "2px",
        },
        "& tr:hover td": {
            borderBottom: "solid red 1px",
            borderTop: "solid red 1px",
            backgroundColor: "#ccc",
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
});

export const ColorsTable: React.FC<Props> = ({ region, columns, colors, worlds, colorDetails }) => {
    const classes = useStyles();
    return <table className={classes.table}>
        <thead>
            <tr>
                <th className={classes.worldTier} rowSpan={2}>T</th>
                <th className={classes.worldName} rowSpan={2}>World</th>
                <th rowSpan={2}>Type</th>
                {!region && <th rowSpan={2}>Region</th>}
                <ColumnHeaders columns={columns} />
            </tr>
            <tr>
                <ColumnSubHeaders columns={columns} />
            </tr>
        </thead>
        <tbody>
            {worlds.map(world => <tr key={world.id}>
                <td className={classes.worldTier}>{world.tier + 1}{world.class === WorldClass.Exoworld ? "X" : ""}</td>
                <td className={classes.worldName} title={world.name}>{world.name}</td>
                <td>{world.type.toString().charAt(0).toUpperCase() + world.type.toString().slice(1).toLowerCase()}</td>
                {!region && <td>{world.region.toUpperCase()}</td>}
                <ColorCells blocks={world.colors} colors={colors} columns={columns} colorDetails={colorDetails} />
            </tr>)}
        </tbody>
    </table>;
};