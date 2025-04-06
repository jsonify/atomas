export interface Atom {
  id: string;
  value: number;
  element: string;
  position?: number;
}

export interface GameState {
  score: number;
  isGameOver: boolean;
  atoms: Atom[];
  centerAtom: Atom | null;
}

export interface GameControls {
  onRotateClockwise: () => void;
  onRotateCounterClockwise: () => void;
  onCombine: () => void;
}

export interface GameStatus {
  score: number;
  isGameOver: boolean;
}