import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export class StorageService {
    
    constructor() { }

    async set(key: string, value: unknown): Promise<boolean> {
        try {
            value = btoa(JSON.stringify(value)).concat('==');

            await Storage.set({
                key,
                value: value as string
            });
    
            return key in (await this.keys());
        } catch(e) {
            return e;
        }
    }

    async get(key: string, value?: unknown): Promise<unknown> {
        try {
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

        } catch(e) {
            return e;
        }
    }

    async remove(key: string): Promise<boolean> {
        try {
            const item = await Storage.get({ key });

            if (!item) {
                return false;
            }
    
            await Storage.remove({ key });
    
            return !(key in (await this.keys()));
        } catch(e) {
            return e;
        }
    }

    async keys(): Promise<string[]> {
        try {
            const { keys } = await Storage.keys();
            return keys;
        } catch(e) {
            return e;
        }
    }

    async clear(): Promise<boolean> {
        try {
            await Storage.clear();
            const { keys } = await Storage.keys();
            return keys.length < 1;
        } catch(e) {
            return e;
        }
    }
    
}
