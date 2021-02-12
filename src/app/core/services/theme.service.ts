import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DomController } from '@ionic/angular';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {

    private readonly DARKTHEME_NAME: string = 'dark-theme';

    isDarkTheme: boolean;

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly DOM: DomController,
        private readonly storage: StorageService
    ) { }

    async toggleDarkTheme() {
        await this.storage.set(this.DARKTHEME_NAME, this.isDarkTheme);
        this.setDarkTheme();
    }

    async setDarkTheme() {
        this.isDarkTheme = await this.storage.get(this.DARKTHEME_NAME) as boolean;
        this.DOM.write(() => {
            this.document.body.classList.toggle('dark-theme', this.isDarkTheme);
        });
    }
}
