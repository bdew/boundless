import React from "react";
import { createUseStyles } from "react-jss";
import { ItemEntry } from "../data/types";
import { itemImage } from "../data/items";

interface ItemProps {
    rowSpan?: number;
    name?: string;
    item: ItemEntry;
}

const useStyles = createUseStyles({
    cell: {
        maxWidth: "8em",
        padding: "0 12px !important",
    },
    withImage: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: "48px",
        height: "48px",
        margin: "-6px -4px",
    },
});

export const ItemHeader: React.FC<ItemProps> = ({ rowSpan, item, name }) => {
    const classes = useStyles();
    return <th rowSpan={rowSpan} className={classes.cell}>
        <div className={classes.withImage}>
            <img className={classes.icon} src={itemImage(item)} />
            <div>{name || item.name}</div>
        </div>
    </th>;
};
