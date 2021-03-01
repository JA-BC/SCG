import { Component, OnInit } from '@angular/core';
import { StorageService } from '@core/helpers/storage.service';
import { ToastController } from '@ionic/angular';
import { UploadService } from '@providers/upload.service';
import { TokenService } from '@core/services/token.service';
import { parseJwt } from '@core/utils/functions';
import { IToken } from '@core/interfaces/auth.model';

@Component({
    templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

    private readonly storage = new StorageService();
   
    thumbnail: string;
    claims: any = {};

    constructor(
        private readonly toast: ToastController,
        private readonly uploadService: UploadService,
        private readonly tokenService: TokenService
    ) {}

    ngOnInit() { }

    ionViewWillEnter() {
        this.tokenService.getToken().then(v => this.claims = parseJwt(v));

        this.storage.get('PROFILE_THUMBNAIL').then((v: string) => {
            if (!v) {
                return;
            }

            if (!this.thumbnail || v !== this.thumbnail) {
                this.thumbnail = v;
            }
        });
    }

    async onUpload(file: File) {
        const form = new FormData();
        form.append('FileName', file.name);
        form.append('File', file);

        const token = await this.tokenService.getToken();
        form.append('UserId', (parseJwt(token) as IToken).nameid);
        
        const data = await this.uploadService.add(form);
        
        this.storageThumbnail(data);
    }

    async onUploadError(message: string) {
        const toast = await this.toast.create({
            message,
            duration: 2500,
            color: 'danger'
        });

        return await toast.present();
    }

    private async storageThumbnail(data: any) {
        const exists = await this.storage.get('PROFILE_THUMBNAIL');

        if (exists) {
            await this.storage.remove('PROFILE_THUMBNAIL');
        }

        await this.storage.set('PROFILE_THUMBNAIL', data?.FilePath);
        this.thumbnail = data?.FilePath;
        return data?.FilePath;
    }
}

