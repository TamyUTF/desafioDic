import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialogue-input',
  templateUrl: './dialogue-input.component.html',
  styleUrls: ['./dialogue-input.component.css']
})
export class DialogueInputComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<DialogueInputComponent>) { }
    msg: string;
    date = new FormControl( new Date());
  ngOnInit() {
    this.msg = this.data.msg;
  }

  cancel() {
    this.dialogRef.close('false');
  }

  confirm() {
    this.dialogRef.close({
      date: this.date.value,
      confirm: true
    });

  }
  ngOnDestroy() {

  }

}
