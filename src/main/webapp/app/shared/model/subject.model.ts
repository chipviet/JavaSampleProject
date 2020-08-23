import { ITutorDetails } from 'app/shared/model/tutor-details.model';

export interface ISubject {
  id?: number;
  nameSubject?: string;
  tutorDetails?: ITutorDetails;
}

export const defaultValue: Readonly<ISubject> = {};
