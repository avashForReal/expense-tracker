const bcrypt=require('bcryptjs');

const hashPassword=(plainPassword)=>{
  return bcrypt.hashSync(plainPassword, 8);
}

const comparePassword=(plainPassword,hashPassword)=>{
  return bcrypt.compareSync(plainPassword, hashPassword);
}

module.exports={
  hashPassword,
  comparePassword
}