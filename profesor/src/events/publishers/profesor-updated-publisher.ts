import { Subjects,Publisher,ProfesorUpdatedEvent} from '@licenta-dev/common';

export class ProfesorUpdatedPublisher extends Publisher<ProfesorUpdatedEvent>{
  subject: Subjects.ProfesorUpdated = Subjects.ProfesorUpdated;
}