import { Component, Input, OnInit } from '@angular/core';
import { DAVCalendarObject } from 'tsdav'

interface ParsedTask {
  title: string,
  dueDate: Date,
  priority: number,
  done: boolean
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  // @ts-ignore
  @Input() task: DAVCalenderObject;
  parsedTask: ParsedTask | null = null;

  constructor() {

  }

  flipDone() {
    this.parsedTask!.done = !this.parsedTask?.done;
    console.log(`${this.parsedTask?.title} ${this.parsedTask?.done ? 'is done' : 'is not done'}`)
  }

  todoParse(): ParsedTask {
    //TODO: Implement parser
    let parsed: ParsedTask = {
      title: '',
      dueDate: new Date,
      priority: 0,
      done: false
    }

    let dataLines: string[] = this.task.data.split('\n')

    dataLines.forEach((line => {
      if(line.includes('SUMMARY')) {
        parsed.title = line.replace('SUMMARY:', '')
      } else if (line.includes('DUE')) {
        // extract date from due date string in task data
        let stringDate = line.replace('DUE;VALUE=DATE:', '')
        // split the string into an array
        let parsedDate = stringDate.split('')

        // splace the date array from  YYYYMMDD to YYYY-MM-DD to
        // conform to JS date parser
        parsedDate.splice(4, 0, '-')
        parsedDate.splice(7, 0, '-')

        // re-join date array into a string
        stringDate = parsedDate.join('')
        // assign to task object
        parsed.dueDate = new Date(Date.parse(stringDate))
        
        console.log(parsed.dueDate)
      }
    }))

    return parsed;
  }

  ngOnInit(): void {
    this.parsedTask = this.todoParse();
  }

}
