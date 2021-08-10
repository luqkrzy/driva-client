import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent implements OnInit {
  instructors: string[] = ['jan', 'Laszalo', 'Anna', 'Zdiosiek'];
  hours = [...Array.from({length: 14}, (_, i) => i + 7)];
  hoursCount = [...Array.from({length: 5}, (_, i) => i + 1)];
  newLesson: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,) {
  }

  get date(): FormControl {
    return this.newLesson.get('date') as FormControl;
  }

  ngOnInit(): void {
    this.initLessonForm();
  }

  onSave() {
    console.log(this.newLesson.value);
    // console.log(this.newLesson.value.date.toDateString());
    console.log(this.newLesson.value.date.toISOString());
    console.log(this.newLesson.value.date.toLocaleDateString());
    // console.log(this.newLesson.value.date.toLocaleString());
    // console.log(this.newLesson.value.date.toLocaleTimeString());
  }

  validateForm(): boolean {
    return false;
  }

  private initLessonForm(): void {
    this.newLesson = this.fb.group({
      instructorId: [null, Validators.required],
      date: [new Date().toISOString, Validators.required],
      hour: [null, Validators.required],
      hoursCount: [null, Validators.required],
    });
  }
}
