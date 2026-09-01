import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import Board from './Board'
import {
  getNextHead,
  getRandomFood,
  INITIAL_FOOD,
  INITIAL_SNAKE,
  isOutsideBoard,
  isSamePosition,
  type Direction,
  type Food,
  type Position,
} from './game'

const keyDirections: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

function App() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Food>(INITIAL_FOOD)
  const [gameOver, setGameOver] = useState(false)
  const [turns, setTurns] = useState(0)

  function manejarTecla(evento: KeyboardEvent<HTMLDivElement>) {
    const direction = keyDirections[evento.key]
    if (!direction || gameOver) return

    evento.preventDefault()
    setTurns((currentTurns) => currentTurns + 1)
    setSnake((currentSnake) => {
      const nextHead = getNextHead(currentSnake[0], direction)
      const hitsBody = currentSnake.some((part) => isSamePosition(part, nextHead))

      if (isOutsideBoard(nextHead) || hitsBody) {
        setGameOver(true)
        return currentSnake
      }

      const ateFood = isSamePosition(nextHead, food)
      const nextSnake = [nextHead, ...currentSnake]
      if (!ateFood) nextSnake.pop()
      if (ateFood) setFood(getRandomFood(nextSnake))
      return nextSnake
    })
  }

  function restartGame() {
    setSnake(INITIAL_SNAKE)
    setFood(INITIAL_FOOD)
    setGameOver(false)
    setTurns(0)
  }

  return (
    <main className="game-shell">
      <section className="game-card" tabIndex={0} autoFocus onKeyDown={manejarTecla}>
        <header className="game-header">
          <p className="eyebrow">JUEGO POR TURNOS · 8 × 8</p>
          <h1>Serpiente</h1>
          <p className="instructions">Usa las flechas del teclado para avanzar una celda por turno.</p>
        </header>

        <div className="score-row">
          <div><span>Turnos</span><strong>{turns}</strong></div>
          <div><span>Tamaño</span><strong>{snake.length}</strong></div>
          <button type="button" onClick={restartGame}>Reiniciar</button>
        </div>

        <Board snake={snake} food={food} gameOver={gameOver} />

        <div className={`status ${gameOver ? 'status--game-over' : ''}`} role="status">
          {gameOver ? 'Fin del juego: la serpiente chocó.' : 'La partida está activa'}
        </div>
      </section>
    </main>
  )
}

export default App