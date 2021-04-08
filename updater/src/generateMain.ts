import { promises as fs } from 'fs';
import { getColors, getWorlds } from './dataFetch';
import { DataJson } from './outputTypes';

async function doExport(): Promise<void> {
    await fs.mkdir('out/img', { recursive: true });
    await fs.mkdir('cache', { recursive: true });

    const output: DataJson = {
        colors: await getColors(),
        worlds: await getWorlds(),
    }

    await fs.writeFile('out/colors.json', JSON.stringify(output, null, 4));
}

doExport().then(() => console.log('All done')).catch(err => console.error(err));