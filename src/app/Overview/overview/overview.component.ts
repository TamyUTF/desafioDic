import { PeriodService } from './../../Period/Shared/period.service';
import { UserEventService } from './../../User/Shared/user-event.service';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartmentService } from 'src/app/Department/Shared/department.service';
import { ProcessService } from 'src/app/Process/Shared/process.service';
import { UserService } from 'src/app/User/Shared/user.service';
import { DicService } from 'src/app/Dics/shared/dic.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/User/Shared/user.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit, OnDestroy {

  constructor(private departmentService: DepartmentService,
              private periodService: PeriodService,
              private processService: ProcessService,
              private userService: UserService,
              private dicService: DicService,
              private authService: AuthService,
              private userEventService: UserEventService) {
                this.filterByDepartment('Marketing');
                this.verifyServices();
                this.verifyUser();
  }
  googleChart: {
    title: string,
    data: any,
    type: string,
    columnNames: any,
    options: any,
    width: number,
    height: number,
    chart: boolean;
  };
  dics$: any;
  todo: number;
  doing: number;
  done: number;
  subs: Subscription;
  user: User;

  verifyUser() {
    if (this.authService.isAuthenticated) {
      this.userEventService.getUser();
      this.subs = this.userEventService.userEvent.subscribe(res => this.user = res);
    }
  }

  filterByDepartment(department) {
    this.dicService.filterByDepartment(department).subscribe(dics => {
      this.dics$ = dics;
      this.todo = dics.filter(d => d.status.name === 'Definindo').length;
      this.doing = dics.filter(d => d.status.name === 'Definido').length;
      this.done = dics.filter(d => d.status.name === 'Concluído').length;

      this.googleChart = {
        title: department,
        type: 'PieChart',
        data: [
          ['Definindos', this.todo],
          ['Em andamento', this.doing],
          ['Concluídos', this.done]
        ],
        columnNames: ['Status', 'Quantidade de Dics'],
        options: {
          colors: ['#eb3013', '#f78d14', '#11bd14'], is3D: true
        },
        width: 500,
        height: 400,
        chart: true
      };
    });
  }

  filterByProcess(process) {
    this.dicService.filterByProcess(process).subscribe(dics => {
      this.dics$ = dics;
      this.todo = dics.filter(d => d.status.name === 'Definindo').length;
      this.doing = dics.filter(d => d.status.name === 'Definido').length;
      this.done = dics.filter(d => d.status.name === 'Concluído').length;

      this.googleChart = {
        title: process,
        type: 'PieChart',
        data: [
          ['Definindos', this.todo],
          ['Em andamento', this.doing],
          ['Concluídos', this.done]
        ],
        columnNames: ['Status', 'Quantidade de Dics'],
        options: {
          colors: ['#eb3013', '#f78d14', '#11bd14'], is3D: true
        },
        width: 500,
        height: 400,
        chart: true
      };
    });
  }

  verifyServices() {
    if (!this.departmentService.departments$) {
      this.departmentService.list();
    }
    if (!this.processService.processes$) {
      this.processService.list();
    }
    if (!this.periodService.periods$) {
      this.periodService.list();
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnInit() {
  }

}
