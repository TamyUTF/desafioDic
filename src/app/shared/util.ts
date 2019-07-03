import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class Util {
    constructor(private snackbar: MatSnackBar) {}

    openSnackBar(msg: string, action: string) {
        this.snackbar.open(msg, action, {
            duration: 5000,
        });
    }
 }
