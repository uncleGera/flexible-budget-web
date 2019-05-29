import { IEntity } from './entity.interface';

export interface IMoneyFlow extends IEntity {
  amount: number;
  description: string;
  kind: string;
  day_id?: number;
  period_id?: number;
}
