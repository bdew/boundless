import { getItem } from "../data/items";
import { ItemEntry } from "../data/types";
import { ItemColumn } from "./defs";

export function flattenColumns(columns: ItemColumn[]): string[] {
    return columns.flatMap((e) => {
        if (typeof e === "string") return [e];
        return e.entries.map(s => typeof s === "string" ? s : s.id);
    });
}

export function columnsToDefs(columns: ItemColumn[]): ItemEntry[] {
    return flattenColumns(columns).map(x => getItem(x));
}