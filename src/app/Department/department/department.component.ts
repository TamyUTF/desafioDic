import { UserEventService } from './../../User/Shared/user-event.service';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/User/Shared/user.model';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private userEventService: UserEventService) { }
  user: User;

  
  ngOnInit() {
  }

}
