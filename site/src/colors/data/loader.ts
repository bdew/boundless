import { useEffect, useState } from "react";
import { ColorEntry, DataJson, WorldEntry } from "./types";

interface LoadedData {
    state: "loaded";
    worlds: WorldEntry[];
    colors: Map<number, ColorEntry>;
}

interface Errored {
    state: "error";
    err: Error;
}

interface Pending {
    state: "pending";
}

type LoadState = LoadedData | Errored | Pending;


export function useLoadedData(): LoadState {
    const [state, setState] = useState<LoadState>({ state: "pending" });

    useEffect(() => {
        fetch("/data/colors.json").then((fetched) => {
            if (!fetched.ok) {
                return fetched.text().then(text => {
                    setState({ state: "error", err: new Error(`Error loading data: ${fetched.statusText} (${fetched.status})\n${text}`) });
                });
            } else {
                return (fetched.json() as Promise<DataJson>).then(data => {
                    setState({
                        state: "loaded",
                        colors: new Map(data.colors.map(e => [e.id, e])),
                        worlds: data.worlds,
                    });
                });
            }
        }).catch(err => setState({ state: "error", err }));
    }, []);

    return state;
}
