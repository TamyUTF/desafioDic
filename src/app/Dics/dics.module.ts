import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DicRoutingModule } from './shared/dic-routing.module';
import { MaterialModule } from './../shared/material.module';
import { DicsComponent } from './dic/dics.component';
import { DicListComponent } from './dic-list/dic-list.component';
import { DicFormComponent } from './dic-form/dic-form.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MaterialModule,
        DicRoutingModule
    ],
    declarations: [
        DicsComponent,
        DicListComponent,
        DicFormComponent
    ],
    exports: [
        DicListComponent,
        DicsComponent
    ]
})

export class DicModule { }
