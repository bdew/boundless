import React, { useMemo } from "react";
import { ColorEntry, WorldColors } from "../data/types";
import clsx from "clsx";
import { createUseStyles } from "react-jss";

interface Props {
    colors: Map<number, ColorEntry>;
    blocks: WorldColors;
    type: string;
}

const useStyles = createUseStyles({
    cell: {
        maxWidth: "8em",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    light: {
        color: "black",
    },
    dark: {
        color: "white",
    },
});

export const ColorCell: React.FC<Props> = ({ colors, blocks, type }) => {
    const classes = useStyles();

    const myColor = useMemo(() => {
        if (!blocks[type]) return null;
        return colors.get(blocks[type]) || null;
    }, [colors, blocks, type]);

    if (myColor)
        return <td className={clsx(classes.cell, myColor.light ? classes.light : classes.dark)} style={{ backgroundColor: myColor.color }}>{myColor.name}</td>;
    else
        return <td>-</td>;
};