export interface Paged<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export enum WorldClass {
    Homeworld = "Homeworld",
    Exoworld = "Exoworld",
    Sovereign = "Sovereign World",
    Creative = "Creative World",
}

export enum WorldType {
    LUSH, METAL, COAL, CORROSIVE, SHOCK, BLAST, TOXIC, CHILL, BURN, DARKMATTER, RIFT, BLINK
}

export enum WorldRegion {
    USE = "use",
    USW = "usw",
    EUC = "euc",
    AUS = "aus",
    SANDBOX = "sandbox",
}

export interface World {
    id: number;
    active: boolean;
    tier: number;
    text_name: string;
    display_name: string;
    html_name: string;
    world_class: WorldClass;
    world_type: WorldType;
    region: WorldRegion;
    is_public: boolean;
    is_locked: boolean;
}

export interface LocalizationEntry {
    lang: string;
    name: string;
}

export interface Color {
    game_id: number;
    base_color: string;
    gleam_color: string;
    localization: LocalizationEntry[]
}

export interface BlockColor {
    item: {
        game_id: number;
        name: string;
    };
    color: {
        game_id: number;
    };
    active: boolean;
}

export interface BlockColors {
    block_colors: BlockColor[];
}

export interface Item {
    game_id: number;
    name: string;
    localization: LocalizationEntry[]
}