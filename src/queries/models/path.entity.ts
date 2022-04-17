import {
  Column,
  CreatedAt,
  IsUUID,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Model } from './model';

@Table({ tableName: 'paths' })
export class Paths extends Model<Paths> {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  path: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;
}
