import { ICourse } from 'app/shared/model/course.model';

export interface IFeedback {
  id?: number;
  comment?: string;
  rating?: number;
  classId?: ICourse;
}

export const defaultValue: Readonly<IFeedback> = {};
