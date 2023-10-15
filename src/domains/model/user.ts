import { ObjectId } from 'typeorm';

export class UserM {
  id: ObjectId;
  email: string;
  name: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
