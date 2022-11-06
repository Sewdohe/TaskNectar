import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DAVCalendarObject } from 'tsdav'
import { BehaviorSubject } from 'rxjs';

interface Task {
  data: string,
}

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.css']
})
export class CalendarDetailComponent implements OnInit {
  calenderObjects$: BehaviorSubject<DAVCalendarObject[] | null>;
  objects: DAVCalendarObject[] | null = null;
  tasks: Task[] = [];

  constructor(private auth: AuthService) {
    this.calenderObjects$ = this.auth.selectedCalendar$;
  }

  ngOnInit(): void {

  }

}
