export interface ILesson {
  lessonId?: number;
  productId?: number;
  date?: string;
  timeStart?: number;
  hoursCount?: number;
  instructorId?: number;
  instructorFullName?: string;
  instructorEmail?: string;
  instructorPhone?: string;
}

export interface IGeneralLesson {
  lessonId: number;
  productId: number;
  date: string;
  timeStart: number;
  hoursCount: number;
  studentId: number;
  studentFistName: string;
  studentLastName: string;
  studentEmail: string;
  studentPhoneNumber: string;
  instructorId: number;
  instructorFistName: string;
  instructorLastName: string;
  instructorEmail: string;
  instructorPhoneNumber: string;
}
