import { ILesson } from './lesson';

export interface iInstructor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  createdBy: number;
  createdDate: string;
  userId?: number;
  lessons?: ILesson[];
  workSchedule?: any;
}
