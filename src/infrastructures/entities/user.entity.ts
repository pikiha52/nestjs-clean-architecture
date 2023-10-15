import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn() id: ObjectId;
  @Column() email: string;
  @Column() name: string;
  @Column() password: string;
  @Column({ default: Date.now }) created_at: Date;
  @Column({ default: Date.now }) updated_at: Date;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
