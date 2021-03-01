import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';
import { AuthService } from '@core/services/auth.service';
import { TokenService } from '@core/services/token.service';
import { parseJwt } from '@core/utils/functions';
import { StorageService } from '@core/helpers/storage.service';
import { UploadService } from '@providers/upload.service';
import { IToken } from '@core/interfaces/auth.model';

@Component({
    templateUrl: './ajuste.component.html'
})
export class AjusteComponent implements OnInit {

    private readonly storage = new StorageService();

    thumbnail: string;
    claims: any;

    constructor(
        public readonly theme: ThemeService,
        public readonly auth: AuthService,
        public readonly token: TokenService,
        private readonly uploadService: UploadService
    ) { }

    ngOnInit() { }

    ionViewWillEnter() {
        if (!this.claims) {
            this.token.getToken().then(v => this.claims = parseJwt(v));
        }

        this.findThumbnail();
    }

    async findThumbnail() {
        const exists = await this.storage.get('PROFILE_THUMBNAIL') as string;

        if (exists) {
            if (!this.thumbnail || exists !== this.thumbnail) {
                this.thumbnail = exists;
            }

            return;
        }

        const token = await this.token.getToken();
        const data = await this.uploadService.requery({
            UserId: (parseJwt(token) as IToken).nameid
        });
        
        // User has not profile img
        if (!data) {
            this.thumbnail = null;
            return;
        }

        await this.storage.set('PROFILE_THUMBNAIL', data?.FilePath);
        this.thumbnail = data?.FilePath;
    }

    async logout() {
        await this.auth.logout();
        this.claims = null;
        this.storage.remove('PROFILE_THUMBNAIL');
    }

}
