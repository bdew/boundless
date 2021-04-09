import React from "react";
import { createUseStyles } from "react-jss";
import { GithubBadge } from "./githubBadge";

interface Props {
    title: string;
}

const useStyles = createUseStyles({
    header: {
        backgroundColor: "#AAF",
        borderBottom: "solid #888 2px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0.25em",
    },
    title: {
        fontWeight: "bold",
        fontSize: "150%",
        flexGrow: 1,
    },
    item: {
        padding: "0 0.5em",
        "& + $item": {
            borderLeft: "solid #666 1px",
        },
        "&:last-child": {
            paddingRight: 0,
        },
    },
});

export const Header: React.FC<Props> = ({ title, children }) => {
    const classes = useStyles();
    return <div className={classes.header}>
        <div className={classes.title}>{title}</div>
        {React.Children.map(children, c => <div className={classes.item}>{c}</div>)}
        <div className={classes.item}>
            <GithubBadge slug="bdew/boundless" fill="white" />
        </div>
    </div>;
};