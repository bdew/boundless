import React, { useMemo } from "react";
import { ColorCell } from "./cell";
import { ColorEntry, WorldColors } from "../data/types";
import { columnsToDefs } from "../grouping";
import { ItemColumn } from "../grouping/defs";

interface Props {
    columns: ItemColumn[];
    colors: Map<number, ColorEntry>;
    blocks: WorldColors;

}

export const ColorCells: React.FC<Props> = ({ columns, colors, blocks }) => {
    const colElems = useMemo(() =>
        columnsToDefs(columns).map(col =>
            <ColorCell key={col.id} colors={colors} blocks={blocks} type={col.id.toString()} />
        )
        , [columns, colors, blocks]);

    return <>{colElems}</>;
};
