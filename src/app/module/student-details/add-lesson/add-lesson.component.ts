import { Component, Inject, OnInit } from '@angular/core';
import { iInstructor } from '../../../model/instructor';
import { ILesson } from '../../../model/lesson';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LessonsService } from '../../lessons/lessons.service';
import { InstructorService } from '../../instructors/instructor.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent implements OnInit {
  instructors: iInstructor[] = [];
  hours = [...Array.from({length: 14}, (_, i) => i + 7)];
  hoursCount = [...Array.from({length: 5}, (_, i) => i + 1)];
  lessonForm: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['id', 'data', 'start', 'koniec', 'instruktor'];
  todayDate: Date = new Date();

  constructor(private fb: FormBuilder,
    private lessonsService: LessonsService,
    private instructorService: InstructorService,
    private dialogRef: MatDialogRef<AddLessonComponent>,
    @Inject(MAT_DIALOG_DATA) private productId: number) {
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
    this.date.value.setHours(10);
    const date = this.date.value.toISOString().slice(0, 10);
    const newLesson: ILesson = this.lessonForm.value;
    newLesson.date = date;
    this.dialogRef.close(newLesson);
  }

  validateForm(): boolean {
    return this.lessonForm.invalid;
  }

  private initLessonForm(): void {
    this.lessonForm = this.fb.group({
      instructorId: [null, Validators.required],
      date: [new Date().toLocaleDateString(), Validators.required],
      timeStart: [null, Validators.required],
      hoursCount: [null, Validators.required],
      productId: [this.productId, Validators.required],
    });
  }
}
