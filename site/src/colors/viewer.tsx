import React, { useMemo } from 'react';
import { DataJson } from './data/types';
import { ColorTable } from './table';
import { Switch, Route, Redirect } from "react-router-dom";

interface Props {
    data: DataJson;
}

export const ColorViewer: React.FC<Props> = ({ data }) => {
    const colors = useMemo(() => new Map(data.colors.map(e => [e.id, e])), [data]);
    return <Switch>
        <Route path="/colors/:wclass/:group/:region?">
            <ColorTable colors={colors} worlds={data.worlds} />
        </Route>
        <Route path="/">
            <Redirect to="/colors/main/rocks" />
        </Route>
    </Switch>

}