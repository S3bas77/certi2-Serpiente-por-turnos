export type Position = {
  row: number
  column: number
}

export type Food = Position

export type Direction = 'up' | 'down' | 'left' | 'right'

export const INITIAL_SNAKE: Position[] = [
  { row: 3, column: 3 },
  { row: 3, column: 2 },
  { row: 3, column: 1 },
]

export const INITIAL_FOOD: Food = { row: 5, column: 5 }

export function isSamePosition(first: Position, second: Position) {
  return first.row === second.row && first.column === second.column
}

export function getNextHead(head: Position, direction: Direction): Position {
  const movement = {
    up: { row: -1, column: 0 },
    down: { row: 1, column: 0 },
    left: { row: 0, column: -1 },
    right: { row: 0, column: 1 },
  }

  return {
    row: head.row + movement[direction].row,
    column: head.column + movement[direction].column,
  }
}

export function isOutsideBoard(position: Position) {
  return position.row < 0 || position.row >= 8 || position.column < 0 || position.column >= 8
}

export function getRandomFood(snake: Position[]): Food {
  const freeCells: Position[] = []

  for (let row = 0; row < 8; row += 1) {
    for (let column = 0; column < 8; column += 1) {
      const position = { row, column }
      if (!snake.some((part) => isSamePosition(part, position))) {
        freeCells.push(position)
      }
    }
  }

  return freeCells[Math.floor(Math.random() * freeCells.length)]
}