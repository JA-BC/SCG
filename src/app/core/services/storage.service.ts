import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({ providedIn: 'root' })
export class StorageService {
    
    constructor() { }

    async set(key: string, value: unknown): Promise<boolean> {
        value = btoa(JSON.stringify(value)).concat('==');

        await Storage.set({
            key,
            value: value as string
        });

        return key in (await this.keys());
    }

    async get(key: string, value?: unknown): Promise<unknown> {
        const item = await Storage.get({ key });

        if (!item?.value) {
            if (value) {
                await this.set(key, value);
                return { key, value };
            }

            return null;
        }
        
        // remove == at end then decode value
        item.value = JSON.parse(atob(item.value.substring(0, item.value.length - 2)));
        return item.value;
    }

    async remove(key: string): Promise<boolean> {
        const item = await Storage.get({ key });

        if (!item) {
            return false;
        }

        await Storage.remove({ key });

        return !(key in (await this.keys()));
    }

    async keys(): Promise<string[]> {
        const { keys } = await Storage.keys();
        return keys;
    }

    async clear(): Promise<boolean> {
        await Storage.clear();
        const { keys } = await Storage.keys();
        return keys.length < 1;
    }
    
}