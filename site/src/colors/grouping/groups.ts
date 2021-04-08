import { ItemColumn } from "./defs";

export const RockColumns: ItemColumn[] = [
    {
        title: 'Rock',
        entries: [
            { name: 'Sedimentary', id: 'ROCK_SEDIMENTARY_BASE_DUGUP' },
            { name: 'Metamorphic', id: 'ROCK_METAMORPHIC_BASE_DUGUP' },
            { name: 'Igneous', id: 'ROCK_IGNEOUS_BASE_DUGUP' }
        ]
    },
    'CRYSTAL_GLEAM_BASE',
    'ICE_DEFAULT_BASE_DUGUP',
    'ICE_GLACIER_BASE_DUGUP',
]

export const SoilColumns: ItemColumn[] = [
    {
        title: 'Soil',
        entries: [
            { name: 'Silty', id: 'SOIL_SILTY_BASE_DUGUP' },
            { name: 'Clay', id: 'SOIL_CLAY_BASE_DUGUP' },
            { name: 'Peaty', id: 'SOIL_PEATY_BASE_DUGUP' }
        ]
    },
    {
        title: 'Grass',
        entries: [
            { name: 'Verdant', id: 'GRASS_VERDANT_BASE' },
            { name: 'Gnarled', id: 'GRASS_GNARLED_BASE' },
            { name: 'Barbed', id: 'GRASS_BARBED_BASE' }
        ]
    },
    'SAND_DEFAULT_BASE_DUGUP',
    'GRAVEL_DEFAULT_BASE_DUGUP',
    'ASH_DEFAULT_BASE_DUGUP',
    'MUD_DEFAULT_BASE_DUGUP',
    'SPONGE_DEFAULT_BASE_DUGUP',
    'MOULD_DEFAULT_BASE_DUGUP',
    'GROWTH_DEFAULT_BASE_DUGUP',
];


export const WoodColumns: ItemColumn[] = [
    {
        title: 'Wood',
        entries: [
            { name: 'Twisted', id: 'WOOD_TWISTED_TRUNK_DUGUP' },
            { name: 'Lustrous', id: 'WOOD_LUSTROUS_TRUNK_DUGUP' },
            { name: 'Ancient', id: 'WOOD_ANCIENT_TRUNK_DUGUP' }
        ]
    },
    {
        title: 'Foliage',
        entries: [
            { name: 'Lush', id: 'WOOD_LUSH_LEAVES_DUGUP' },
            { name: 'Waxy', id: 'WOOD_WAXY_LEAVES_DUGUP' },
            { name: 'Exotic', id: 'WOOD_EXOTIC_LEAVES_DUGUP' }
        ]
    },
    'TANGLE_DEFAULT_BASE_DUGUP',
    'THORNS_DEFAULT_BASE_DUGUP',
]

export const PlantColumns: ItemColumn[] = [
    'FLORA_FLOWER_1',
    'FLORA_FLOWER_2',
    'FLORA_FLOWER_3',
    'FLORA_FLOWER_4',
    'FLORA_PLANT_INKY_DUGUP',
    'FLORA_PLANT_FIBROUS_DUGUP',
    'PLANT_LOTUS_DUGUP',
    'PLANT_YUCCA_DUGUP',
    'PLANT_CACTUS_DUGUP',
    'PLANT_ALOE_DUGUP',
    'PLANT_SNOWDROP_DUGUP',
    'PLANT_FIDDLEHEAD_DUGUP',
]

export const ShroomColumns: ItemColumn[] = [
    'FUNGUS_AMANITA_DUGUP',
    'FUNGUS_BRACKET_DUGUP',
    'FUNGUS_CORAL_DUGUP',
    'FUNGUS_SCATTER_DUGUP',
    'FUNGUS_DRIPPING_DUGUP',
    'FUNGUS_GLOWING_DUGUP',    
]
