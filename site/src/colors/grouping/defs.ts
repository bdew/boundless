interface ColumnNameOverride {
    name: string;
    id: string;
}

type SubColumn = string | ColumnNameOverride;

interface GroupColumn {
    title: string;
    entries: SubColumn[];
}

export type ItemColumn = string | GroupColumn;

