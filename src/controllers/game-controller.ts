import {DeckController}       from "./deck-controller";
import {PlayerHandController} from "./player-hand-controller";
import {CardInterface}        from "../interfaces/card.interface";
import {shuffle}              from "lodash";

export class GameController {
  firstPlayerHand: PlayerHandController;
  secondPlayerHand: PlayerHandController;
  round: number;

  constructor() {
    this.firstPlayerHand  = new PlayerHandController();
    this.secondPlayerHand = new PlayerHandController();
    this.round            = 0;

    return this;
  }

  /**
   * Prepares the game
   */
  pre() {
    const deck = new DeckController(DeckController.buildDeck()).shuffle();
    this.distribute(deck);
    return this;
  }

  /**
   * Distributes the cards one by one
   * @param {DeckController} deck - Fresh deck
   */
  distribute(deck: DeckController) {
    for (let i = 0; i < deck.length(); i++) {
      const card = deck.cards[i];
      (i % 2) ? this.firstPlayerHand.push(card) : this.secondPlayerHand.push(card);
    }
  }

  /**
   * Start the game
   */
  play() {
    while (!this.isGameOver()) {
      this.playRound();
    }
    this.winner();
  }

  /**
   * Play the round
   * @param {CardInterface[]} bucket - Bucket war saved
   */
  playRound(bucket: CardInterface[] = []) {
    this.round++; // Increase round

    const [firstPlayerCard, secondPlayerCard] = [this.firstPlayerHand.shift(), this.secondPlayerHand.shift()];

    // Check if first player has empty deck
    if (!firstPlayerCard) {
      console.log("First player has no cards left in his deck, he cannot continue the war.".red);
      return;
    }

    // Check if second player has empty deck
    if (!secondPlayerCard) {
      console.log("Second player has no cards left in his deck, he cannot continue the war.".red);
      return;
    }

    // Real random card pos
    const reward = shuffle([...bucket, firstPlayerCard, secondPlayerCard]);

    // Player one wins
    if (firstPlayerCard.value > secondPlayerCard.value) {
      console.log(`(${firstPlayerCard.value} vs ${secondPlayerCard.value}) First player wins the round ${this.round}!`.cyan);
      this.firstPlayerHand.multiplePush(reward);
    }
    // Player two wins
    else if (firstPlayerCard.value < secondPlayerCard.value) {
      console.log(`(${firstPlayerCard.value} vs ${secondPlayerCard.value}) Second player wins the round ${this.round}!`.cyan);
      this.secondPlayerHand.multiplePush(reward);
    }
    // War
    else {
      console.log("War!".yellow);
      this.war(reward);
    }
  }

  /**
   * Prepare bucket war
   * @param {CardInterface[]} prevReward - Preserves previous reward
   */
  war(prevReward: CardInterface[]) {
    const [nextFirstPlayerCard, nextSecondPlayerCard] = [this.firstPlayerHand.shift(), this.secondPlayerHand.shift()];

    // Check if first player has empty deck
    if (!nextFirstPlayerCard) {
      console.log("First player has no cards left in his deck, he cannot continue the war.".red);
      return;
    }

    // Check if second player has empty deck
    if (!nextSecondPlayerCard) {
      console.log("Second player has no cards left in his deck, he cannot continue the war.".red);
      return;
    }

    // Create a reward bucket
    const bucket: CardInterface[] = [
      ...prevReward,
      nextFirstPlayerCard,
      nextSecondPlayerCard
    ];

    this.playRound(bucket);
  }

  /**
   * Check if game over
   */
  isGameOver() {
    return !this.firstPlayerHand.length() || !this.secondPlayerHand.length();
  }

  /**
   * Display the winner
   */
  winner() {
    const winner = this.firstPlayerHand.length() ? "First" : "Second";
    console.log(`${winner} player wins the game!`.green);
  }
}
