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
  }

  constructor(private davService: DavService) {
  }
}
