export interface ILesson {
  id: number;
  productId: number;
  date: string;
  timeStart: number;
  hoursCount: number;
  instructorId: number;
  instructorFistName: string;
  instructorLastName: string;
  instructorEmail: string;
  instructorPhone: string;
}

export interface IGeneralLesson {
  id: number;
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
