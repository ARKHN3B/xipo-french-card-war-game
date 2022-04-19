import {DeckController} from "./deck-controller";
import {CardInterface}  from "../interfaces/card.interface";

export class PlayerHandController extends DeckController{
  constructor() {
    super();
  }

  push(card: CardInterface) {
    this._cards.push(card);
  }

  multiplePush(cards: CardInterface[]) {
    this._cards = [...this._cards, ...cards];
  }

  shift() {
    return this._cards.shift();
  }
}
