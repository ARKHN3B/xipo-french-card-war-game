import {flatten, map, shuffle} from "lodash";
import {Motif}                 from "../enums/motif";
import {CardInterface}         from "../interfaces/card.interface";
import {Face}                  from "../enums/face";
import {cardValuesMap}         from "../constants/cardmap";

export class DeckController {
  protected _cards: CardInterface[];

  constructor(cards: CardInterface[] = []) {
    this._cards = cards;

    return this;
  }

  get cards(): CardInterface[] {
    return this._cards;
  }

  set cards(value: CardInterface[]) {
    this._cards = value;
  }

  /**
   * Get deck length
   */
  length(): number {
    return this._cards.length;
  }

  /**
   * Shuffle deck
   */
  shuffle() {
    this._cards = shuffle(this._cards);
    return this;
  }

  /**
   * Build a deck
   */
  static buildDeck(): CardInterface[] {
    return flatten(map(Object.values(Motif), suit => map(Object.values(Face), face => ({
      suit,
      face,
      value: cardValuesMap[face]
    }))));
  };
}
