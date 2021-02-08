import { IsString } from 'class-validator';
import { model, Schema, Document } from 'mongoose';

interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  email: {
    type: String,
    set: (v: string) => v.toLowerCase()
  },
  firstName: String,
  lastName: String,
  password: String
})

const userModel = model<UserInterface & Document>('User', userSchema);

class UserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

class LogInDto {
  @IsString()
  public email: string;

  @IsString()
  public password: string;
}

export default LogInDto;

export { UserInterface, userModel, UserDto, LogInDto }
