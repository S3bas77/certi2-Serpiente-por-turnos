import type { Food, Position } from './game'

type BoardProps = {
  snake: Position[]
  food: Food
  gameOver: boolean
}

const BOARD_SIZE = 8

function samePosition(first: Position, second: Position) {
  return first.row === second.row && first.column === second.column
}

export default function Board({ snake, food, gameOver }: BoardProps) {
  return (
    <table className={`board ${gameOver ? 'board--game-over' : ''}`} aria-label="Tablero de serpiente">
      <tbody>
        {Array.from({ length: BOARD_SIZE }, (_, row) => (
          <tr key={row}>
            {Array.from({ length: BOARD_SIZE }, (_, column) => {
              const position = { row, column }
              const snakeIndex = snake.findIndex((part) => samePosition(part, position))
              const isFood = samePosition(food, position)
              const cellClass = snakeIndex === 0
                ? 'cell cell--head'
                : snakeIndex > 0
                  ? 'cell cell--body'
                  : isFood
                    ? 'cell cell--food'
                    : 'cell'

              return (
                <td className={cellClass} key={`${row}-${column}`}>
                  {snakeIndex === 0 && <span aria-label="Cabeza de la serpiente">●</span>}
                  {snakeIndex > 0 && <span aria-label="Cuerpo de la serpiente">•</span>}
                  {isFood && snakeIndex === -1 && <span aria-label="Comida">✦</span>}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}