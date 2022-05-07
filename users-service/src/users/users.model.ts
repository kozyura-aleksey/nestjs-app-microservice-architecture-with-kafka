import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  age: number;
}
