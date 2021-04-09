import React from "react";
import { createUseStyles } from "react-jss";
import { ItemEntry } from "../data/types";

interface ItemProps {
    rowSpan?: number;
    name?: string;
    item: ItemEntry;
}

const useStyles = createUseStyles({
    cell: {
        maxWidth: "8em",
        padding: "0 12px",
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

function imageUrl(id: string): string {
    return `/data/img/${id}.png`;
}

export const ItemHeader: React.FC<ItemProps> = ({ rowSpan, item, name }) => {
    const classes = useStyles();
    return <th rowSpan={rowSpan} className={classes.cell}>
        <div className={classes.withImage}>
            <img className={classes.icon} src={imageUrl(item.strId)} />
            <div>{name || item.name}</div>
        </div>
    </th>;
};
