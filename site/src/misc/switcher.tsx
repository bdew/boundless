import React from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";

interface Props<T> {
    name: string;
    value: T;
    setValue: (v: T) => void;
    options: [T, string][];
}

const useStyles = createUseStyles({
    switcher: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontWeight: "bold",
        marginRight: "0.25em",
    },
    option: {
        border: "solid #888 1px",
        borderRadius: "4px",
        backgroundColor: "white",
        fontWeight: "bold",
        cursor: "pointer",
        padding: "0.25em",
        margin: "0.1em",
    },
    selected: {
        borderColor: "#444",
        backgroundColor: "#ACA",
    },
});

export const Switcher: <T>(props: Props<T>) => React.ReactElement = ({ value, setValue, options, name }) => {
    const classes = useStyles();
    return (
        <div className={classes.switcher}>
            <div className={classes.name}>{name}</div>
            {options.map(([val, name], num) => (
                <div
                    className={clsx(classes.option, value === val && classes.selected)}
                    key={num}
                    onClick={() => setValue(val)}
                >
                    {name}
                </div>
            ))}
        </div>
    );
};
