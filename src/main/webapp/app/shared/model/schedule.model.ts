import { ITutorDetails } from 'app/shared/model/tutor-details.model';
import { ICourse } from 'app/shared/model/course.model';
import { WeekDay } from 'app/shared/model/enumerations/week-day.model';

export interface ISchedule {
  id?: number;
  weekDay?: WeekDay;
  start?: number;
  tutorDetails?: ITutorDetails;
  course?: ICourse;
}

export const defaultValue: Readonly<ISchedule> = {};
