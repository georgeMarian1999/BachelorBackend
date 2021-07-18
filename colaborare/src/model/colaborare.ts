import mongoose from 'mongoose';

interface ColaborareAttrs{
  student_id:string;
  profesor_id:string;
  tema_id:number;
  tema_proprie:string;
  descriere:string;
  status:string;
}
interface ColaborareDoc extends mongoose.Document{
  student_id:string;
  profesor_id:string;
  tema_id:number;
  tema_proprie:string;
  descriere:string;
  status:string;
}
interface ColaborareModel extends mongoose.Model<ColaborareDoc>{
  build(attrs: ColaborareAttrs): ColaborareDoc;
}

const ColaborareSchema= new mongoose.Schema(
  {
    student_id:{
      type:String,
      required:true
    },
    profesor_id:{
      type:String,
      required:true
    },
    tema_id:{
      type:Number,
      required:false
    },
    tema_proprie:{
      type:String,
      required:false
    },
    descriere:{
      type:String,
      required:true
    },
    status:{
      type:String,
      required:true
    }
},
{
  toJSON:{
    transform(doc,ret){
      ret.colaborare_id=ret._id;
      delete ret._id;
      delete ret._v;
    }
  }
}
);
ColaborareSchema.statics.build= (attrs: ColaborareAttrs)=>{
  return new Colaborare(attrs);
}
const Colaborare = mongoose.model<ColaborareDoc,ColaborareModel>('Colaborare',ColaborareSchema);

export {Colaborare};