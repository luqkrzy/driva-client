import { Component, Inject, OnInit } from '@angular/core';
import { iInstructor } from '../../../model/instructor';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LessonsService } from '../../lessons/lessons.service';
import { InstructorService } from '../../instructors/instructor.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ILesson } from '../../../model/lesson';

@Component({
  selector: 'app-update-lesson',
  templateUrl: './update-lesson.component.html',
  styleUrls: ['./update-lesson.component.scss']
})
export class UpdateLessonComponent implements OnInit {
  instructors: iInstructor[] = [];
  hours = [...Array.from({length: 14}, (_, i) => i + 7)];
  hoursCount = [...Array.from({length: 5}, (_, i) => i + 1)];
  lessonForm: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['id', 'data', 'start', 'koniec', 'instruktor'];
  todayDate = new Date();

  constructor(private fb: FormBuilder,
    private lessonsService: LessonsService,
    private instructorService: InstructorService,
    private dialogRef: MatDialogRef<UpdateLessonComponent>,
    @Inject(MAT_DIALOG_DATA) private lesson: ILesson) {
  }

  get date(): FormControl {
    return this.lessonForm.get('date') as FormControl;
  }

  ngOnInit(): void {
    this.instructorService.getAllInstructors().subscribe(data => {
      this.instructors = data;
    });
    this.initLessonForm();
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    const newLesson: ILesson = this.lessonForm.value;
    newLesson.date = this.formatDate(this.date.value);
    this.dialogRef.close(newLesson);
  }

  validateForm(): boolean {
    return this.lessonForm.invalid || (
      this.lessonForm.pristine
    );
  }

  private formatDate(date: Date | string): string {
    if (date instanceof Date) {
      date.setHours(10);
      return date.toISOString().slice(0, 10);
    } else {
      return date;
    }
  }

  private initLessonForm(): void {
    this.lessonForm = this.fb.group({
      id: [this.lesson.id],
      instructorId: [this.lesson.instructorId, Validators.required],
      date: [this.lesson.date, Validators.required],
      timeStart: [this.lesson.timeStart, Validators.required],
      hoursCount: [this.lesson.hoursCount, Validators.required],
      productId: [this.lesson.productId, Validators.required],
    });
  }
}


