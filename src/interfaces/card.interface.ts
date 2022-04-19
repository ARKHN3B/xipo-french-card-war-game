import {Motif} from "../enums/motif";
import {Face}  from "../enums/face";

export interface CardInterface {
  suit: Motif
  face: Face
  value: number
}
