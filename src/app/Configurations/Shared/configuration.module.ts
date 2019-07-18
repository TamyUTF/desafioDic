import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

import { ConfigurationComponent } from '../configuration/configuration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    ConfigurationComponent
  ],
  exports: [
    ConfigurationComponent
  ],
  entryComponents: [
    ConfigurationComponent
  ]
})
export class ConfigurationModule { }
