import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';
import { TokenService } from '@core/services/token.service';
import { parseJwt } from '@core/utils/functions';
import { UploadService } from '@providers/upload.service';
import { AccountService } from '@providers/account.service';

@Component({
    templateUrl: './ajuste.component.html',
    providers: [TokenService]
})
export class AjusteComponent implements OnInit {

    constructor(
        private readonly tokenService: TokenService,
        private readonly uploadService: UploadService,
        public readonly theme: ThemeService,
        public readonly account: AccountService 
    ) { }

    ngOnInit() {}

    ionViewDidEnter() {
        this.getThumbnail(); 
    }

    private async getThumbnail() {
        if (this.account.userThumbnail) {
            return;
        }

        if (!this.account.claims) {
            const token = await this.tokenService.getToken();
            this.account.claims = parseJwt(token);
        }

        const data = await this.uploadService.requery({
            UserId: this.account.claims.nameid
        });

        this.account.userThumbnail = data?.FilePath || 'Resources/Images/no-profile.png';
    }

}
