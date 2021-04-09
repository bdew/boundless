import React from "react";
import { createUseStyles } from "react-jss";
import { ColorEntry } from "../data/types";
import clsx from "clsx";

interface Props {
    color: ColorEntry;
    click?: () => void;
}

const useStyles = createUseStyles({
    box: {
        width: "8em",
        height: "8em",
        border: "solid black 1px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        fontWeight: "bold",
        fontSize: "125%",
        textAlign: "center",
    },
    light: {
        color: "black",
    },
    dark: {
        color: "white",
    },
    clicky: {
        cursor: "pointer",
    },
    smaller: {
        fontSize: "75%",
    },
});

export const ColorBox: React.FC<Props> = ({ color, click }) => {
    const classes = useStyles();
    return <div className={clsx(classes.box, color.light ? classes.light : classes.dark, click && classes.clicky)}
        style={{ backgroundColor: color.color }}
        onClick={click}
    >
        <div>{color.id}</div>
        <div>{color.name}</div>
        <div>{color.color.toUpperCase()}</div>
        <div className={classes.smaller}>RGB: {color.rgb[0]}, {color.rgb[1]}, {color.rgb[2]}</div>
        <div className={classes.smaller}>HSV: {color.hsv[0]}, {color.hsv[1]}, {color.hsv[2]}</div>
    </div>;
};