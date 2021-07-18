import {Subjects,ColaborareAcceptataEvent,Listener} from '@licenta-dev/common';

import { queueGroupName } from './queue-group-name';
import { ProfesorUpdatedPublisher } from '../publishers/profesor-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';
import { Profesor } from '../../model/profesor';
import { Message } from 'node-nats-streaming';

export class ColaborareAcceptataListener extends Listener<ColaborareAcceptataEvent>{
  subject: Subjects.ColaborareAcceptata = Subjects.ColaborareAcceptata;
  queueGroupName = queueGroupName;

  async onMessage(data: ColaborareAcceptataEvent['data'],msg:Message){
    const profesor= await Profesor.findById(data.profesor_id);
    if(profesor){
      console.log(profesor.numar_locuri);
      const nou_numar_locuri= profesor.numar_locuri-1;
      profesor.set({numar_locuri: nou_numar_locuri});
      await profesor.save();
      new ProfesorUpdatedPublisher(natsWrapper.client).publish({
        profesor_id:profesor.id,
        facultate_id:profesor.facultate_id,
        numar_locuri:nou_numar_locuri,
      })
      msg.ack();
    }
    else throw new Error("There is no profesor");

  }
}