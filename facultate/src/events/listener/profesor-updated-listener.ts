import {Subjects,ProfesorUpdatedEvent,Listener} from '@licenta-dev/common';
import { queueGroupname } from './queue-group-name';

import { Facultate } from '../../model/facultate';
import { Message } from '@licenta-dev/common/node_modules/node-nats-streaming';

export class ProfesorUpdatedListener extends Listener<ProfesorUpdatedEvent>{
  subject : Subjects.ProfesorUpdated = Subjects.ProfesorUpdated;
  queueGroupName = queueGroupname;


  async onMessage(data: ProfesorUpdatedEvent['data'],msg:Message){
    
    let newTeachers=[];
    const facultate=await Facultate.findById(data.facultate_id);
    if(facultate){
      for(let i=0;i<facultate.teachers.length;i++){
        if(facultate.teachers[i].id===data.profesor_id){
          console.log("Gasit prof");
          facultate.teachers[i].numar_locuri=data.numar_locuri;
          
        }
      }
      newTeachers=facultate.teachers;
    }
    const facultate2=await Facultate.findById(data.facultate_id);
    if(facultate2){
      facultate2.set({teachers: newTeachers});
      await facultate2.save();
      msg.ack();
    }
    
    
  }
}