import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
    declarations: [
        FilterPipe
    ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    CoreModule,
    FormsModule
  ],
  exports: [
    IonicModule,
    CoreModule,
    FormsModule,
    FilterPipe
  ],
  providers: [
  ],
})
export class SharedModule {}

