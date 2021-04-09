import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    footer: {
        fontWeight: 500,
        padding: "0.5em",
    },
});

export const Footer: React.FC = () => {
    const classes = useStyles();
    return <footer className={classes.footer}>
        This site is an unofficial fan site for the game <a href="https://store.steampowered.com/app/324510/Boundless/">Boundless</a>,
        I am not affiliated with Wonderstruck Games.
        Color data is taken from <a href="https://api.boundlexx.app/api/v2">Boundlexx API</a>.
        Block images taken from <a href="https://butt.boundless.mayumi.fi/">BUTT</a>.
    </footer>;
};