"use client"

import { useState, useEffect } from "react"
import { Plus, Minus, ClockIcon as ArrowClockwise } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Atom types
type AtomType = {
  value: number
  special?: "plus" | "minus" | "arrow"
  color: string
}

// Element names for display
const ELEMENT_NAMES: { [key: number]: string } = {
  1: "H",
  2: "He",
  3: "Li",
  4: "Be",
  5: "B",
  6: "C",
  7: "N",
  8: "O",
  9: "F",
  10: "Ne",
  11: "Na",
  12: "Mg",
  13: "Al",
  14: "Si",
  15: "P",
  16: "S",
  17: "Cl",
  18: "Ar",
}

export default function AtomGame() {
  const [atoms, setAtoms] = useState<AtomType[]>([])
  const [currentAtom, setCurrentAtom] = useState<AtomType | null>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  // Initialize game
  useEffect(() => {
    startGame()
  }, [])

  // Start a new game
  const startGame = () => {
    // Start with 6 random atoms
    const initialAtoms = Array(6)
      .fill(null)
      .map(() => generateRandomAtom(1, 3))

    setAtoms(initialAtoms)
    setCurrentAtom(generateNextAtom())
    setScore(0)
    setGameOver(false)
  }

  // Generate a random atom
  const generateRandomAtom = (min: number, max: number): AtomType => {
    const value = Math.floor(Math.random() * (max - min + 1)) + min
    return {
      value,
      color: getColorForValue(value),
    }
  }

  // Generate the next atom to place (includes special atoms)
  const generateNextAtom = (): AtomType => {
    const random = Math.random()

    // 70% chance of normal atom
    if (random < 0.7) {
      return generateRandomAtom(1, Math.min(5, Math.max(1, Math.floor(score / 100) + 1)))
    }

    // 20% chance of plus atom
    if (random < 0.9) {
      return {
        value: 0,
        special: "plus",
        color: "#f59e0b",
      }
    }

    // 5% chance of minus atom
    if (random < 0.95) {
      return {
        value: 0,
        special: "minus",
        color: "#ef4444",
      }
    }

    // 5% chance of arrow atom
    return {
      value: 0,
      special: "arrow",
      color: "#3b82f6",
    }
  }

  // Get color based on atom value
  const getColorForValue = (value: number): string => {
    const colors = [
      "#f87171", // red
      "#fb923c", // orange
      "#facc15", // yellow
      "#a3e635", // lime
      "#4ade80", // green
      "#2dd4bf", // teal
      "#38bdf8", // sky
      "#818cf8", // indigo
      "#c084fc", // purple
      "#f472b6", // pink
    ]

    return colors[(value - 1) % colors.length]
  }

  // Place the current atom at the specified index
  const placeAtom = (index: number) => {
    if (!currentAtom || gameOver) return

    let newAtoms = [...atoms]

    // Handle special atoms
    if (currentAtom.special === "plus") {
      newAtoms = handlePlusAtom(newAtoms, index)
    } else if (currentAtom.special === "minus") {
      newAtoms = handleMinusAtom(newAtoms, index)
    } else if (currentAtom.special === "arrow") {
      // Arrow atom shuffles the board
      newAtoms = shuffleArray([...newAtoms])
    } else {
      // Insert regular atom
      newAtoms.splice(index, 0, currentAtom)
    }

    setAtoms(newAtoms)

    // Check if game over (too many atoms)
    if (newAtoms.length >= 18) {
      setGameOver(true)
      return
    }

    // Generate next atom
    setCurrentAtom(generateNextAtom())
  }

  // Handle plus atom logic
  const handlePlusAtom = (atoms: AtomType[], index: number): AtomType[] => {
    const newAtoms = [...atoms]

    // Get indices of atoms to check (left and right of the insertion point)
    const leftIndex = index === 0 ? newAtoms.length - 1 : index - 1
    const rightIndex = index % newAtoms.length

    // Check if atoms on both sides are the same
    if (
      newAtoms[leftIndex].value === newAtoms[rightIndex].value &&
      !newAtoms[leftIndex].special &&
      !newAtoms[rightIndex].special
    ) {
      const newValue = newAtoms[leftIndex].value + 1

      // Create new merged atom
      const mergedAtom: AtomType = {
        value: newValue,
        color: getColorForValue(newValue),
      }

      // Remove the two atoms and add the merged one
      if (leftIndex < rightIndex) {
        newAtoms.splice(rightIndex, 1)
        newAtoms.splice(leftIndex, 1)
        newAtoms.splice(leftIndex, 0, mergedAtom)
      } else {
        newAtoms.splice(leftIndex, 1)
        newAtoms.splice(rightIndex, 1)
        newAtoms.splice(rightIndex, 0, mergedAtom)
      }

      // Add to score
      setScore((prev) => prev + newValue * 10)

      // Check for chain reactions
      return checkForChainReactions(newAtoms)
    } else {
      // If no match, just insert the plus atom
      newAtoms.splice(index, 0, {
        value: 0,
        special: "plus",
        color: "#f59e0b",
      })
      return newAtoms
    }
  }

  // Handle minus atom logic (removes an atom)
  const handleMinusAtom = (atoms: AtomType[], index: number): AtomType[] => {
    const newAtoms = [...atoms]

    // Remove the atom at the specified index
    if (newAtoms.length > 0) {
      newAtoms.splice(index % newAtoms.length, 1)
    }

    return newAtoms
  }

  // Check for chain reactions after a merge
  const checkForChainReactions = (atoms: AtomType[]): AtomType[] => {
    const newAtoms = [...atoms]
    let madeChanges = false

    // Look for adjacent identical atoms
    for (let i = 0; i < newAtoms.length; i++) {
      const nextIndex = (i + 1) % newAtoms.length

      if (newAtoms[i].value === newAtoms[nextIndex].value && !newAtoms[i].special && !newAtoms[nextIndex].special) {
        const newValue = newAtoms[i].value + 1

        // Create new merged atom
        const mergedAtom: AtomType = {
          value: newValue,
          color: getColorForValue(newValue),
        }

        // Remove the two atoms and add the merged one
        if (i < nextIndex) {
          newAtoms.splice(nextIndex, 1)
          newAtoms.splice(i, 1)
          newAtoms.splice(i, 0, mergedAtom)
        } else {
          newAtoms.splice(i, 1)
          newAtoms.splice(nextIndex, 1)
          newAtoms.splice(nextIndex, 0, mergedAtom)
        }

        // Add to score
        setScore((prev) => prev + newValue * 10)

        madeChanges = true
        break
      }
    }

    // If we made changes, check for more chain reactions
    if (madeChanges) {
      return checkForChainReactions(newAtoms)
    }

    return newAtoms
  }

  // Shuffle array (for arrow atom)
  const shuffleArray = (array: AtomType[]): AtomType[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // Render atom with appropriate content
  const renderAtom = (atom: AtomType) => {
    if (atom.special === "plus") {
      return <Plus className="w-6 h-6 text-white" />
    } else if (atom.special === "minus") {
      return <Minus className="w-6 h-6 text-white" />
    } else if (atom.special === "arrow") {
      return <ArrowClockwise className="w-6 h-6 text-white" />
    } else {
      return (
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-white">{ELEMENT_NAMES[atom.value] || atom.value}</span>
          <span className="text-xs text-white/80">{atom.value}</span>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Score */}
      <div className="text-2xl font-bold text-white mb-4">Score: {score}</div>

      {/* Current atom */}
      <div className="mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: currentAtom?.color || "#888" }}
        >
          {currentAtom && renderAtom(currentAtom)}
        </div>
      </div>

      {/* Game board */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96">
        {/* Game over overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 rounded-full flex flex-col items-center justify-center z-10">
            <h2 className="text-2xl font-bold text-white mb-4">Game Over</h2>
            <p className="text-xl text-white mb-6">Final Score: {score}</p>
            <Button onClick={startGame}>Play Again</Button>
          </div>
        )}

        {/* Atoms in a circle */}
        {atoms.map((atom, index) => {
          const angle = (index / atoms.length) * 2 * Math.PI
          const radius = atoms.length <= 12 ? 120 : 140
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <div
              key={index}
              className="absolute w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                backgroundColor: atom.color,
              }}
              onClick={() => placeAtom(index)}
            >
              {renderAtom(atom)}
            </div>
          )
        })}

        {/* Placement indicators */}
        {!gameOver &&
          atoms.map((_, index) => {
            const angle = ((index + 0.5) / atoms.length) * 2 * Math.PI
            const radius = atoms.length <= 12 ? 120 : 140
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <div
                key={`indicator-${index}`}
                className="absolute w-6 h-6 rounded-full bg-white/20 flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:bg-white/40"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                onClick={() => placeAtom(index + 1)}
              >
                <div className="w-2 h-2 rounded-full bg-white/60"></div>
              </div>
            )
          })}

        {/* Center circle */}
        <div className="absolute left-1/2 top-1/2 w-20 h-20 rounded-full bg-slate-700 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="text-white text-xs text-center">{atoms.length}/18</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 text-white/80 text-sm max-w-md text-center">
        <p className="mb-2">
          <span className="font-bold text-yellow-400">Plus atoms</span>: Combine identical adjacent atoms
        </p>
        <p className="mb-2">
          <span className="font-bold text-red-400">Minus atoms</span>: Remove an atom
        </p>
        <p className="mb-2">
          <span className="font-bold text-blue-400">Arrow atoms</span>: Shuffle the board
        </p>
        <p>Game over when you have 18 or more atoms!</p>
      </div>

      {/* Restart button */}
      <Button onClick={startGame} className={cn("mt-6", gameOver ? "hidden" : "")}>
        Restart Game
      </Button>
    </div>
  )
}

