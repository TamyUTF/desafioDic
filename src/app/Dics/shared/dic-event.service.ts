import { DicService } from './dic.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Dic } from './dic.model';

@Injectable({
  providedIn: 'root'
})
export class DicEventService {

  constructor(private dicService: DicService) { }
  dicList: Dic[];
  dicListEvent = new EventEmitter<any[]>();

  getAll() {
    this.dicService.getAll()
    .subscribe(dics => {
      this.dicList = dics;
      this.dicListEvent.emit(this.dicList);
    });
  }

  getByPeriod(period: string) {
    this.dicService.filterByPeriod(period)
    .subscribe(dics => {
      this.dicList = dics;
      this.dicListEvent.emit(this.dicList);
    });
  }

  getByDepartment(department: string) {
    this.dicService.filterByDepartment(department)
    .subscribe(dics => {
      this.dicList = dics;
      this.dicListEvent.emit(this.dicList);
    });
  }

  getByProcess(process: string) {
    this.dicService.filterByProcess(process)
    .subscribe(dics => {
      this.dicList = dics;
      this.dicListEvent.emit(this.dicList);
    });
  }

  getByStatus(status: string) {
    this.dicService.filterByStatus(status)
    .subscribe(dics => {
      this.dicList = dics;
      this.dicListEvent.emit(this.dicList);
    });
  }

  getByUser(user: string) {
    this.dicService.filterByUser(user)
    .subscribe(dics => {
      this.dicList = dics;
      this.dicListEvent.emit(this.dicList);
    });
  }

  getByLate(late: number) {
    this.dicService.filterByLate(late)
    .subscribe(dics => {
      this.dicList = dics;
      this.dicListEvent.emit(this.dicList);
    });
  }
}
