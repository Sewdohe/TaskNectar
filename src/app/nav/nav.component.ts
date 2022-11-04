import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { DAVCalendar } from 'tsdav'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  calendars$: Observable<DAVCalendar[] | null>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService) {
    this.calendars$ = this.auth.calendars$;
  }
  
  ngOnInit() {

  }
  
  getCalendarDetail(calendar: DAVCalendar) {
    console.log(`get details for ${calendar.displayName}`)
    this.auth.getCalendarDetail(calendar)
  }

}
