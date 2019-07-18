import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

import { FormDepartmentProcessComponent } from './form-department-process/form-department-process.component';
import { DialogueInputComponent } from './dialogue-input/dialogue-input.component';
import { DialogueConfirmComponent } from './dialogue-confirm/dialogue-confirm.component';


@NgModule({
  declarations: [
    DialogueConfirmComponent,
    DialogueInputComponent,
    FormDepartmentProcessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    FormDepartmentProcessComponent,
    DialogueConfirmComponent,
    DialogueInputComponent
  ],
  entryComponents: [
    FormDepartmentProcessComponent,
    DialogueConfirmComponent,
    DialogueInputComponent
  ]
})
export class UtilModule { }
