import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialogue-confirm',
  templateUrl: './dialogue-confirm.component.html',
  styleUrls: ['./dialogue-confirm.component.css']
})
export class DialogueConfirmComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private dialogRef: MatDialogRef<DialogueConfirmComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close('false');
  }

  confirm() {
    this.dialogRef.close('true');
  }

  ngOnDestroy() {

  }

}
