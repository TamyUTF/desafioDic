import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

import { PeriodFormComponent } from './period-form/period-form.component';

@NgModule({
  declarations: [
    PeriodFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    PeriodFormComponent
  ],
  entryComponents: [
    PeriodFormComponent
  ]
})
export class PeriodModule { }
