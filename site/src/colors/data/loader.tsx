import React, { useEffect, useState } from 'react';
import { ColorViewer } from '../viewer';
import { DataJson } from './types';

interface LoadedData {
    state: 'loaded';
    data: DataJson;
}

interface Errored {
    state: 'error';
    err: Error;
}

interface Pending {
    state: 'pending';
}

type LoadState = LoadedData | Errored | Pending;

export const DataLoader: React.FC = () => {
    const [state, setState] = useState<LoadState>({ state: 'pending' });

    useEffect(() => {
        fetch('/data/colors.json').then((fetched) => {
            return fetched.json().then(data => {
                setState({ state: 'loaded', data });
            })
        }).catch(err => setState({ state: 'error', err }));
    }, []);

    switch (state.state) {
        case 'error': return <>
            <h1>Something went wrong...</h1>
            <pre>{state.err.stack ? state.err.stack : state.err.message}</pre>
        </>
        case 'pending': return <h1>Loading...</h1>;
        case 'loaded': return <ColorViewer data={state.data} />
    }
}