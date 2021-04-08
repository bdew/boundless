import { WorldClass, WorldRegion, WorldType } from "./apiTypes";

export interface ColorEntry {
    id: number;
    color: string;
    gleam: string;
    name: string;
    light: boolean;
}

export interface WorldColors {
    [k: string]: number;
}

export interface WorldEntry {
    id: number;
    tier: number;
    name: string;
    class: WorldClass;
    type: WorldType;
    region: WorldRegion;
    colors: WorldColors;
}

export interface DataJson {
    colors: ColorEntry[];
    worlds: WorldEntry[];
}

export interface ItemEntry {
    id: number;
    strId: string;
    name: string;
}

export interface ItemsJson {
    items: ItemEntry[];
}