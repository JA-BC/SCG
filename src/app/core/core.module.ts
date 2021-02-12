import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonToggleComponent } from './components/button-toggle/button-toggle.component';
import { InputWrapperComponent } from './components/input-wrapper/input-wrapper.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';

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
    providers: [],
})
export class CoreModule { }
