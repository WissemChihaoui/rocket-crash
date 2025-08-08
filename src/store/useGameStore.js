// stores/useCrashGameStore.ts
import { create } from 'zustand'

// type GameState = 'idle' | 'countingDown' | 'inProgress' | 'crashed'

// interface CrashGameStore {
//   // Game state
//   gameState: GameState
//   timer: number
//   currentMultiplier: number
//   crashPoint: number | null
//   bets: Record<string, number>
  
//   // Actions
//   startCountdown: () => void
//   startRound: () => void
//   placeBet: (playerId: string, amount: number) => void
//   cashOut: (playerId: string) => void
//   crashGame: () => void
//   resetRound: () => void
// }

const useCrashGameStore = create((set, get) => ({
  // Initial state
  gameState: 'idle',
  timer: 6,
  currentMultiplier: 1.0,
  crashPoint: null,
  bets: {},
  
  // Actions
  startCountdown: () => {
    set({ gameState: 'countingDown' })
    
    const interval = setInterval(() => {
      set(state => {
        const newTime = state.timer - 1
        if (newTime <= 0) {
          clearInterval(interval)
          get().startRound()
          return { timer: 6 }
        }
        return { timer: newTime }
      })
    }, 1000)
  },
  
  startRound: () => {
    // Generate crash point between 1.02 and 500 with decreasing probability
    const crashPoint = generateCrashPoint()
    set({ 
      gameState: 'inProgress',
      currentMultiplier: 1.0,
      crashPoint,
    })
    
    // Start multiplier increase
    const interval = setInterval(() => {
      set(state => {
        if (state.gameState !== 'inProgress') {
          clearInterval(interval)
          return {}
        }
        
        const newMultiplier = parseFloat((state.currentMultiplier + 0.01).toFixed(2))
        
        // Check if we've reached crash point
        if (newMultiplier >= (state.crashPoint ?? Infinity)) {
          get().crashGame()
          clearInterval(interval)
        }
        
        return { currentMultiplier: newMultiplier }
      })
    }, 100) // Update every 100ms
  },
  
  placeBet: (playerId, amount) => {
    set(state => ({
      bets: {
        ...state.bets,
        [playerId]: amount
      }
    }))
  },
  
  cashOut: (playerId) => {
    const state = get()
    if (!state.bets[playerId]) return
    
    const winnings = state.bets[playerId] * state.currentMultiplier
    // Handle payout logic here
    
    set(state => {
      const newBets = { ...state.bets }
      delete newBets[playerId]
      return { bets: newBets }
    })
  },
  
  crashGame: () => {
    set({ gameState: 'crashed' })
    // Handle loss logic for remaining bets
    setTimeout(() => get().resetRound(), 5000)
  },
  
  resetRound: () => {
    set({ 
      gameState: 'idle',
      currentMultiplier: 1.0,
      crashPoint: null,
      bets: {},
    })
    setTimeout(() => get().startCountdown(), 1000)
  }
}))

// Helper function to generate crash point with decreasing probability
function generateCrashPoint() {
  // This creates an exponential distribution favoring lower numbers
  const r = Math.random()
  const min = 1.02
  const max = 500
  const lambda = 0.05 // Adjust for desired distribution
  
  let point = min + (-Math.log(1 - r) / lambda)
  point = Math.min(point, max)
  return parseFloat(point.toFixed(2))
}

export default useCrashGameStore