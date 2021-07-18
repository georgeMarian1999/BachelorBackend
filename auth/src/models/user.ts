import mongoose from 'mongoose';


interface UserAttrs{
  email:string;
  password:string;
  firstname:string;
  lastname:string;
  anStudiu:number;
  grupa:number;
  sectie:string;
  facultate_id:string;
}
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  firstname:string;
  lastname:string;
  anStudiu:number;
  grupa:number;
  sectie:string;
  facultate_id:string;
}
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
{
  email:{
    type:String,
    required:true
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
    type: String,
    required: true
  },
  anStudiu:{
    type: Number,
    required: true
  },
  grupa:{
    type: Number,
    required: true
  },
  sectie:{
    type: String,
    required: true
  },
  facultate_id:{
    type:String,
    required:true
  }
},
{
  toJSON:{
    transform(doc,ret){
      ret.student_id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
}
);
const bcrypt = require('bcrypt');
const saltRounds = 10;
userSchema.pre('save',async function(done){
  if(this.isModified('password')){
    const hash = bcrypt.hashSync(this.get('password'), saltRounds);
    this.set('password',hash);
  } 
  
  done();
});
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
