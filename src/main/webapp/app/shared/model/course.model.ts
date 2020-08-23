import { ISubject } from 'app/shared/model/subject.model';
import { ISchedule } from 'app/shared/model/schedule.model';

export interface ICourse {
  id?: number;
  level?: string;
  basicTuition?: number;
  currencyCode?: string;
  subjectId?: ISubject;
  scheduleIds?: ISchedule[];
}

export const defaultValue: Readonly<ICourse> = {};
