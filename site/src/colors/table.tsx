import React, { useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ColorEntry, WorldClass, WorldEntry, WorldRegion } from './data/types';
import { SoilColumns, PlantColumns, RockColumns, WoodColumns, ShroomColumns } from './grouping';
import { ColumnHeaders, ColumnSubHeaders } from './header';
import { ColorCells } from './cells';
import { Switcher } from '../switcher';
import { GithubBadge } from '../githubBadge';

type DisplayClass = 'main' | 'sov';
type DisplayGroup = 'rocks' | 'soil' | 'trees' | 'plants' | 'shrooms';

interface Props {
    colors: Map<number, ColorEntry>;
    worlds: WorldEntry[];
}

interface Params {
    wclass: DisplayClass;
    group: DisplayGroup;
    region: WorldRegion;
}

export const ColorTable: React.FC<Props> = ({ colors, worlds }) => {
    const { wclass, group, region } = useParams<Params>();

    const filtered = useMemo(() => {
        let data = worlds;

        if (wclass === 'sov')
            data = data.filter(x => x.class === WorldClass.Sovereign);
        else
            data = data.filter(x => x.class === WorldClass.Homeworld || x.class === WorldClass.Exoworld);

        if (region) data = data.filter(x => x.region === region);

        data = data.sort((a, b) => (a.tier - b.tier) || a.name.localeCompare(b.name))

        return data;
    }, [worlds, wclass, region])

    const history = useHistory();

    const setDisplay = useCallback((wclass: DisplayClass, group: string, region: WorldRegion | null) => {
        history.push(`/colors/${wclass}/${group}${region ? '/' + region : ''}`)
    }, [history]);

    const columns = useMemo(() => {
        switch (group) {
            case 'rocks': return RockColumns;
            case 'plants': return PlantColumns;
            case 'trees': return WoodColumns;
            case 'soil': return SoilColumns;
            case 'shrooms': return ShroomColumns;
            default: return [];
        }
    }, [group]);

    return <>
        <div className="colorWrapper">
            <div className="headerRow">
                <div className="title">Boundless Color Viewer</div>
                <Switcher<DisplayGroup>
                    name="Type:"
                    value={group || 'rocks'}
                    setValue={g => setDisplay(wclass, g, region)}
                    options={[['rocks', 'Rocks'], ['soil', 'Soil'], ['trees', 'Trees'], ['plants', 'Plants'], ['shrooms', 'Mushrooms']]}
                />
                <Switcher
                    name="Region:"
                    value={region || null}
                    setValue={r => setDisplay(wclass, group, r)}
                    options={[[null, 'All'], [WorldRegion.EUC, 'EUC'], [WorldRegion.USE, 'USE'], [WorldRegion.USW, 'USW'], [WorldRegion.AUS, 'AUS']]}
                />
                <Switcher<DisplayClass>
                    name="Class:"
                    value={wclass || 'main'}
                    setValue={c => setDisplay(c, group, region)}
                    options={[['main', 'Home/Exo'], ['sov', 'Sovereign']]}
                />
                <GithubBadge slug="bdew/boundless" fill="white" />
            </div>
            <div className="colorTable">
                <table>
                    <thead>
                        <tr>
                            <th className="worldTier" rowSpan={2}>T</th>
                            <th className="worldName" rowSpan={2}>World</th>
                            <th rowSpan={2}>Type</th>
                            {!region && <th rowSpan={2}>Region</th>}
                            <ColumnHeaders columns={columns} />
                        </tr>
                        <tr>
                            <ColumnSubHeaders columns={columns} />
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(world => <tr key={world.id}>
                            <td className="worldTier">{world.tier + 1}{world.class === WorldClass.Exoworld ? 'X' : ''}</td>
                            <td className="worldName" title={world.name}>{world.name}</td>
                            <td>{world.type.toString().charAt(0).toUpperCase() + world.type.toString().slice(1).toLowerCase()}</td>
                            {!region && <td>{world.region.toUpperCase()}</td>}
                            <ColorCells blocks={world.colors} colors={colors} columns={columns} />
                        </tr>)}
                    </tbody>
                </table>
                <footer>
                    This site is an unofficial fan site for the game <a href="https://store.steampowered.com/app/324510/Boundless/">Boundless</a>, I am not affiliated with Wonderstruck Games.
                    Color data is taken from <a href="https://api.boundlexx.app/api/v2">Boundlexx API</a>.
                    Block images taken from <a href="https://butt.boundless.mayumi.fi/">BUTT</a>.
                </footer>
            </div>
        </div>
    </>
}