import {Subjects,ProfesorCreatedEvent,Listener} from '@licenta-dev/common';
import { queueGroupname } from './queue-group-name';

import { Facultate } from '../../model/facultate';
import { Message } from '@licenta-dev/common/node_modules/node-nats-streaming';

export class ProfesorCreatedListener extends Listener<ProfesorCreatedEvent>{
  subject : Subjects.ProfesorCreated = Subjects.ProfesorCreated;
  queueGroupName=queueGroupname;
  

  async onMessage(data: ProfesorCreatedEvent['data'],msg: Message){
    const facultate=Facultate.findById(data.facultate_id);
    facultate.select('teachers');
    facultate.exec(async function(err,facultate){
        if(err){
          console.error(err);
        }
      if(facultate){
        facultate.teachers.push(data);
        await facultate.save();
      }
    })
    msg.ack();
  }
}