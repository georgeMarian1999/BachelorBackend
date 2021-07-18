import mongoose from 'mongoose';

interface ProfesorAttr{
  email:string;
  password:string;
  firstname:string;
  lastname:string;
  numar_locuri: number;
  titlu: string;
  facultate_id: string;
}

interface ProfesorDoc extends mongoose.Document{
  email:string;
  password:string;
  firstname:string;
  lastname:string;
  numar_locuri: number;
  titlu: string;
  facultate_id: string;
}

interface ProfesorModel extends mongoose.Model<ProfesorDoc>{
  build(attrs: ProfesorAttr): ProfesorDoc;
}

const ProfesorSchema= new mongoose.Schema(
  {
    email:{
      type: String,
      required: true
    },
    password:{
      type: String,
      required: true
    },
    firstname:{
      type: String,
      required: true
    },
    lastname:{
      type:String,
      required: true
    },
    numar_locuri:{
      type: String,
      required: true
    },
    titlu:{
      type:String,
      required:true
    },
    facultate_id:{
      type:String,
      required:true
    },
  },
  {
    toJSON:{
      transform(doc,ret){
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);
const bcrypt = require('bcrypt');
const saltRounds = 10;
ProfesorSchema.pre('save',async function(done){
  if(this.isModified('password')){
    const hash = bcrypt.hashSync(this.get('password'), saltRounds);
    this.set('password',hash);
  } 
  done();
});

ProfesorSchema.statics.build= (attrs:ProfesorAttr)=>{
  return new Profesor(attrs);
}

const Profesor= mongoose.model<ProfesorDoc, ProfesorModel>("Profesor",ProfesorSchema);


export {Profesor};