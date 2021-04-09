import React from "react";
import { createUseStyles } from "react-jss";
import { Footer } from "./footer";

const useStyles = createUseStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        height: "100VH",
        width: "100%",
    },
    scrolling: {
        flexGrow: 1,
        flexDirection: "column",
        overflowY: "scroll",
        overflowX: "auto",
        display: "flex",
    },
    content: {
        flexGrow: 1,
    },
});


export const Layout: React.FC = ({ children }) => {
    const classes = useStyles();
    return <div className={classes.wrapper}>
        {children}
    </div>;
};

export const Content: React.FC = ({ children }) => {
    const classes = useStyles();
    return <div className={classes.scrolling}>
        <div className={classes.content}>
            {children}
        </div>
        <Footer />
    </div>;
};