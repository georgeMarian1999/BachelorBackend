import {Subjects,Publisher,ProfesorCreatedEvent} from '@licenta-dev/common';

export class ProfesorCreatedPublisher extends Publisher<ProfesorCreatedEvent>{
  subject: Subjects.ProfesorCreated = Subjects.ProfesorCreated;
}