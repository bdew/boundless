import React, { useMemo } from 'react';
import { getItem } from './data/items';
import { ItemColumn } from './grouping/defs';

interface Props {
    columns: ItemColumn[];
}

function imageUrl(id: string): string {
    return `/data/img/${id}.png`;
}

export const ColumnHeaders: React.FC<Props> = ({ columns }) => {
    const colElems = useMemo(() =>
        columns.map(col => {
            if (typeof col === 'string') {
                const def = getItem(col);
                return <th key={def.id} rowSpan={2} className="columnHeader">
                    <div className="headerWithImage">
                        <img className="itemImage" src={imageUrl(def.strId)} />
                        <div>{def.name}</div>
                    </div>
                </th>
            } else {
                return <th key={col.title} colSpan={col.entries.length} className="groupHeader">{col.title}</th>
            }
        })
        , [columns]);

    return <>{colElems}</>
}

export const ColumnSubHeaders: React.FC<Props> = ({ columns }) => {
    const colElems = useMemo(() =>
        columns.flatMap(col => {
            if (typeof col === 'string') {
                return []
            } else {
                return col.entries.flatMap(x => {
                    if (typeof x === 'string') {
                        const def = getItem(x);
                        return <th key={def.id} className="columnHeader">
                            <div className="headerWithImage">
                                <img className="itemImage" src={imageUrl(def.strId)} />
                                <div>{def.name}</div>
                            </div>
                        </th>
                    } else {
                        const def = getItem(x.id);
                        return <th key={def.id} className="columnHeader">
                            <div className="headerWithImage">
                                <img className="itemImage" src={imageUrl(def.strId)} />
                                <div>{x.name}</div>
                            </div>
                        </th>
                    }
                })
            }
        })
        , [columns]);

    return <>{colElems}</>
}