import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import * as path from 'path';
import 'ts-replace-all';
import { Paged } from './apiTypes';

const DEBUG = false;

export async function fetchData<T>(url: string, ttl: number): Promise<T> {
    const cachename = path.join('cache', url.replaceAll(/[/:?]/g, '-') + '.json');
    try {
        const stat = await fs.stat(cachename);
        if (new Date().getTime() - stat.mtime.getTime() < ttl) {
            const data = await fs.readFile(cachename);
            if (DEBUG) console.log(`CACHED: ${url}`);
            return JSON.parse(data.toString('utf-8'));
        } else {
            if (DEBUG) console.log(`OLD: ${url}`)
        }
    } catch (err) {
        if (err.code !== 'ENOENT') throw (err);
    }
    if (DEBUG) console.log(`FETCH: ${url}`);
    const fetched = await fetch(url);

    if (fetched.status !== 200) {
        throw new Error(`Error in fetch: ${url} returned ${fetched.status} ${fetched.statusText} \n ${await fetched.text()}`);
    }

    const js = await fetched.json();
    await fs.writeFile(cachename, JSON.stringify(js, null, 4));
    return js;
}

export async function fetchPaged<T>(url: string, ttl: number): Promise<T[]> {
    const res: T[][] = [];
    let next: string | null = url;
    while (next) {
        const fetched: Paged<T> = await fetchData(next, ttl);
        res.push(fetched.results);
        next = fetched.next;
    }
    return ([] as T[]).concat(...res);
}

export async function downloadFile(url: string, target: string): Promise<void> {
    try {
        const stat = await fs.stat(target);
        if (stat.size > 0) return;
    } catch (err) {
        if (err.code !== 'ENOENT') throw (err);
    }
    const fetched = await fetch(url);

    if (fetched.status !== 200) throw new Error(`DL ${url} Failed: ${fetched.statusText} (${fetched.status})`);

    const data = await fetched.buffer();
    console.log('DL', url, data.length);
    await fs.writeFile(target, data)
}
