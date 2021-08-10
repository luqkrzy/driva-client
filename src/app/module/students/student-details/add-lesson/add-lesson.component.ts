import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ILesson } from '../../../../model/lesson';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent implements OnInit {
  instructors: number[] = [1, 2, 3, 4, 5];
  @Input() productId: number;
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
    const date = this.newLesson.value.date.toISOString().slice(0, 10);
    const newLesson: ILesson = this.newLesson.value;
    newLesson.date = date;
    console.log(newLesson);
  }

  validateForm(): boolean {
    return false;
  }

  private initLessonForm(): void {
    this.newLesson = this.fb.group({
      instructorId: [null, Validators.required],
      date: [new Date().toLocaleDateString(), Validators.required],
      timeStart: [null, Validators.required],
      hoursCount: [null, Validators.required],
      productId: [this.productId, Validators.required],
    });
  }
}
