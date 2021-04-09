import React, { useMemo } from "react";
import { createUseStyles } from "react-jss";
import { getItem } from "../data/items";
import { ItemColumn } from "../grouping/defs";
import { ItemHeader } from "./itemHeader";

interface Props {
    columns: ItemColumn[];
}

const useStyles = createUseStyles({
    group: {
        textAlign: "center",
    },
});

export const ColumnHeaders: React.FC<Props> = ({ columns }) => {
    const classes = useStyles();
    const colElems = useMemo(() =>
        columns.map(col => {
            if (typeof col === "string") {
                const def = getItem(col);
                return <ItemHeader key={def.id} rowSpan={2} item={def} />;
            } else {
                return <th key={col.title} colSpan={col.entries.length} className={classes.group}>{col.title}</th>;
            }
        })
        , [columns, classes]);

    return <>{colElems}</>;
};

export const ColumnSubHeaders: React.FC<Props> = ({ columns }) => {
    const colElems = useMemo(() =>
        columns.flatMap(col => {
            if (typeof col === "string") {
                return [];
            } else {
                return col.entries.flatMap(x => {
                    if (typeof x === "string") {
                        const def = getItem(x);
                        return <ItemHeader key={def.id} rowSpan={2} item={def} />;
                    } else {
                        const def = getItem(x.id);
                        return <ItemHeader key={def.id} rowSpan={2} item={def} name={x.name} />;
                    }
                });
            }
        })
        , [columns]);

    return <>{colElems}</>;
};