import {Position} from "./Position";

export interface Portfolio {
    id: string;
    asOf: string;
    positions: Position[];
}