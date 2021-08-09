import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
})
export class DashComponent {
  displayedColumns: string[] = ['name', 'occupation', 'dateOfBirth', 'age', 'edit'];
  dataSource = USER_INFO;
  dataSchema = SCHEMA;

  constructor(private breakpointObserver: BreakpointObserver) {
  }
}

const USER_INFO = [
  {"name": "John Smith", "occupation": "Advisor", "dateOfBirth": "1984-05-05", "age": 36},
  {"name": "Muhi Masri", "occupation": "Developer", "dateOfBirth": "1992-02-02", "age": 28},
  {"name": "Peter Adams", "occupation": "HR", "dateOfBirth": "2000-01-01", "age": 20},
  {"name": "Lora Bay", "occupation": "Marketing", "dateOfBirth": "1977-03-03", "age": 43},
];
const SCHEMA = ['text', 'text', 'date', 'number', 'edit'];
const USER_SCHEMA = {
  "name": "text",
  "occupation": "text",
  "dateOfBirth": "date",
  "age": "number",
  "edit": "edit"
};

interface User {
  name: string;
  occupation: string;
  dateOfBirth: Date;
  age: number;
}
