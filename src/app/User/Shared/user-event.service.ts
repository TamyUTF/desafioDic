import { SecurityService } from './../../core/security.service';
import { UserService } from './user.service';
import { Injectable, EventEmitter } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserEventService {

  constructor(private userService: UserService,
              private securityService: SecurityService) { }
  user: User;
  userEvent = new EventEmitter<User>();

  getUser() {
    const idUser = this.securityService.decryptoId(localStorage.getItem('currentUser').toString());
    this.userService.get(idUser)
    .subscribe(user => {this.user = user;
                        this.userEvent.emit(this.user); });

  }

  logoutUser() {
    this.user = undefined;
    this.userEvent.emit(this.user);
  }

}
