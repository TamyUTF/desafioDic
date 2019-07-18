import { UserService } from './../User/Shared/user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsGuardService {

  constructor(private userService: UserService) { }


}
