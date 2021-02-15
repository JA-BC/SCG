import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '@env/environment';
import { IonicModule } from '@ionic/angular';
import { ButtonToggleComponent } from './components/button-toggle/button-toggle.component';
import { InputWrapperComponent } from './components/input-wrapper/input-wrapper.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { API_URL_TOKEN } from './interfaces/type';
import { AppInjector } from './utils/injector';

@NgModule({
    declarations: [
        InputWrapperComponent,
        ButtonToggleComponent,
        SearchbarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        InputWrapperComponent,
        ButtonToggleComponent,
        SearchbarComponent
    ],
    providers: [
        { provide: API_URL_TOKEN, useValue: environment.api }
    ],
})
export class CoreModule {
    constructor(injector: Injector) {
        AppInjector.setInjector(injector);
    }
}
