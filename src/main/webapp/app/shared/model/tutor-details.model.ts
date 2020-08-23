import { ISubject } from 'app/shared/model/subject.model';
import { ISchedule } from 'app/shared/model/schedule.model';

export interface ITutorDetails {
  id?: number;
  literacy?: string;
  efficency?: number;
  subjectIds?: ISubject[];
  scheduleIds?: ISchedule[];
}

export const defaultValue: Readonly<ITutorDetails> = {};
