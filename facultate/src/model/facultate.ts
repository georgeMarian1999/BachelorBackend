import mongoose from "mongoose";


interface FacultateAttr{
  name:string;
  teachers: Array<any>;
}
interface FacultateDoc extends mongoose.Document{
  name:string;
  teachers: Array<any>;
}
interface FacultateModel extends mongoose.Model<FacultateDoc>{
  build(attrs:FacultateAttr): FacultateDoc;
}
const FacultateSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true
    },
    teachers:{
      type:Array,
      required:true
    },
  },
  {
    toJSON:{
      transform(doc,ret){
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

const Facultate = mongoose.model<FacultateDoc, FacultateModel>("Facultate",FacultateSchema);

FacultateSchema.statics.build=(attrs:FacultateAttr)=>{
  return new Facultate(attrs);
}

export {Facultate};