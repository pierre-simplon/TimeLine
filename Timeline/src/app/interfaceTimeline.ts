import { Card } from './interfaceCard';

export interface Timeline {
  id: number;
  name: string;
  creationDate: string;
  updateDate: string;
  category: string;
  cardList: Card[];
}
