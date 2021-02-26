import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/services/theme.service';
import { AuthService } from '@core/services/auth.service';

@Component({
    templateUrl: './ajuste.component.html'
})
export class AjusteComponent implements OnInit {

    constructor(
        public readonly theme: ThemeService,
        public readonly auth: AuthService
    ) { }

    ngOnInit() { }

}
