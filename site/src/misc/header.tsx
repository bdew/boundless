import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { GithubBadge } from "./githubBadge";

interface Props {
    title: string;
    back?: string;
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
        paddingBottom: "0.2em",
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

export const Header: React.FC<Props> = ({ title, children, back }) => {
    const classes = useStyles();
    return <div className={classes.header}>
        {back && <Link to={back}>
            <svg height="32" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
        </Link>}
        <div className={classes.title}>{title}</div>
        {React.Children.map(children, c => <div className={classes.item}>{c}</div>)}
        <div className={classes.item}>
            <GithubBadge slug="bdew/boundless" fill="white" />
        </div>
    </div>;
};