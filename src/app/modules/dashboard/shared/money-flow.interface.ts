import { IEntity } from 'libs/models/entity.interface';

export interface IMoneyFlow extends IEntity {
  amount: number;
  description: string;
}
