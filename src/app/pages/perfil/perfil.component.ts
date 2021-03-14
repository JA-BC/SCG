import { Component, OnInit } from '@angular/core';
import { StorageService } from '@core/helpers/storage.service';
import { ToastController } from '@ionic/angular';
import { UploadService } from '@providers/upload.service';
import { AccountService } from '@providers/account.service';

@Component({
    templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

    constructor(
        private readonly toast: ToastController,
        private readonly uploadService: UploadService,
        public readonly account: AccountService
    ) {}

    ngOnInit() { }

    async onUpload(file: File) {
        const form = new FormData();
        form.append('FileName', file.name);
        form.append('File', file);
        form.append('UserId', this.account.claims.nameid);
        
        const data = await this.uploadService.add(form);
        this.account.userThumbnail = this.uploadService.resources + data?.FilePath;
    }

    async onUploadError(message: string) {
        const toast = await this.toast.create({
            message,
            duration: 2500,
            color: 'danger'
        });

        return await toast.present();
    }
    
}

