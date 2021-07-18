import { Subjects,Publisher,ColaborareAcceptataEvent} from '@licenta-dev/common';

export class ColaborareAcceptataPublisher extends Publisher<ColaborareAcceptataEvent>{
  subject : Subjects.ColaborareAcceptata = Subjects.ColaborareAcceptata;
}