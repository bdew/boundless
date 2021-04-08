import { promises as fs } from 'fs';
import { getItems } from './dataFetch';
import { ItemsJson } from './outputTypes';

async function doExport(): Promise<void> {
    await fs.mkdir('out', { recursive: true });
    await fs.mkdir('cache', { recursive: true });

    const itemsOutput: ItemsJson = {
        items: await getItems(),
    }

    await fs.writeFile('out/items.json', JSON.stringify(itemsOutput, null, 4));
}

doExport().then(() => console.log('All done')).catch(err => console.error(err));
