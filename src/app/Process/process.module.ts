import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

import { ProcessComponent } from './process/process.component';
import { ProcessListComponent } from './process-list/process-list.component';

@NgModule({
  declarations: [
    ProcessComponent,
    ProcessListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    ProcessComponent,
    ProcessListComponent
  ],
  entryComponents: [
    ProcessComponent
  ]
})
export class ProcessModule { }
