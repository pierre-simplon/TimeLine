import { Card } from './interfaceCard';

export interface Timeline {
  id: number;
  name: string;
  creationDate: Date;
  updateDate: Date;
  category: string;
  cardList: Card[];
}
