import { Component, NgModule } from "@angular/core";
import { DAVCalendar, DAVCalendarObject } from "tsdav";
import { DavService } from "./dav.service";


@Component({
  selector: "app-root",
  template: `
    <app-nav></app-nav>
  `,
  styles: [],
})
export class AppComponent {
  calendars: DAVCalendar[] | undefined;

  public getDetails(calendar: DAVCalendar): void {
    // console.log('details for: ')
    // console.log(calendar)
    // this.davService.getCalendarDetail(calendar).then((objects: DAVCalendarObject[]) => {
    //   console.log('got object!')
    //   console.log(objects)
    // })
  }

  constructor(private davService: DavService) {
    // davService.getCalendars().then(calendars => {
    //   console.log(calendars)
    //   this.calendars = calendars
    // })
  }
}
