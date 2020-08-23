import { ICourse } from 'app/shared/model/course.model';

export interface ISalary {
  id?: number;
  lever?: number;
  conefficient?: number;
  levelId?: ICourse;
}

export const defaultValue: Readonly<ISalary> = {};
