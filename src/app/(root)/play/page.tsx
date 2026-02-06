'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'

const Page = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const keyMap: { [key: string]: { freq: number; color: string; activeColor: string; label: string } } = {
    'a': { freq: 261.63, color: 'bg-[#ef4444]', activeColor: 'bg-[#f87171]', label: 'A' },      // C4 - Red
    's': { freq: 293.66, color: 'bg-[#f97316]', activeColor: 'bg-[#fb923c]', label: 'S' },      // D4 - Orange
    'd': { freq: 329.63, color: 'bg-[#eab308]', activeColor: 'bg-[#fbbf24]', label: 'D' },      // E4 - Yellow
    'f': { freq: 349.23, color: 'bg-[#22c55e]', activeColor: 'bg-[#4ade80]', label: 'F' },      // F4 - Green
    'g': { freq: 392.00, color: 'bg-[#14b8a6]', activeColor: 'bg-[#2dd4bf]', label: 'G' },      // G4 - Teal
    'h': { freq: 440.00, color: 'bg-[#3b82f6]', activeColor: 'bg-[#60a5fa]', label: 'H' },      // A4 - Blue
    'j': { freq: 493.88, color: 'bg-[#6366f1]', activeColor: 'bg-[#818cf8]', label: 'J' },      // B4 - Indigo
    'k': { freq: 523.25, color: 'bg-[#a855f7]', activeColor: 'bg-[#c084fc]', label: 'K' },      // C5 - Purple
    'l': { freq: 587.33, color: 'bg-[#ec4899]', activeColor: 'bg-[#f472b6]', label: 'L' },      // D5 - Pink
    'q': { freq: 659.25, color: 'bg-[#f43f5e]', activeColor: 'bg-[#fb7185]', label: 'Q' },      // E5 - Rose
    'w': { freq: 698.46, color: 'bg-[#06b6d4]', activeColor: 'bg-[#22d3ee]', label: 'W' },      // F5 - Cyan
    'e': { freq: 783.99, color: 'bg-[#84cc16]', activeColor: 'bg-[#a3e635]', label: 'E' },      // G5 - Lime
    'r': { freq: 880.00, color: 'bg-[#10b981]', activeColor: 'bg-[#34d399]', label: 'R' },      // A5 - Emerald
    't': { freq: 987.77, color: 'bg-[#0ea5e9]', activeColor: 'bg-[#38bdf8]', label: 'T' },      // B5 - Sky
    'y': { freq: 1046.50, color: 'bg-[#8b5cf6]', activeColor: 'bg-[#a78bfa]', label: 'Y' },     // C6 - Violet
    'u': { freq: 1174.66, color: 'bg-[#d946ef]', activeColor: 'bg-[#e879f9]', label: 'U' },     // D6 - Fuchsia
    'i': { freq: 1318.51, color: 'bg-[#f59e0b]', activeColor: 'bg-[#fbbf24]', label: 'I' },     // E6 - Amber
    'o': { freq: 1396.91, color: 'bg-[#dc2626]', activeColor: 'bg-[#ef4444]', label: 'O' },     // F6 - Red
    'p': { freq: 1567.98, color: 'bg-[#ea580c]', activeColor: 'bg-[#f97316]', label: 'P' },     // G6 - Orange
    'z': { freq: 196.00, color: 'bg-[#ca8a04]', activeColor: 'bg-[#eab308]', label: 'Z' },      // G3 - Yellow
    'x': { freq: 220.00, color: 'bg-[#16a34a]', activeColor: 'bg-[#22c55e]', label: 'X' },      // A3 - Green
    'c': { freq: 246.94, color: 'bg-[#0d9488]', activeColor: 'bg-[#14b8a6]', label: 'C' },      // B3 - Teal
    'v': { freq: 277.18, color: 'bg-[#2563eb]', activeColor: 'bg-[#3b82f6]', label: 'V' },      // C#4 - Blue
    'b': { freq: 311.13, color: 'bg-[#4f46e5]', activeColor: 'bg-[#6366f1]', label: 'B' },      // D#4 - Indigo
    'n': { freq: 369.99, color: 'bg-[#9333ea]', activeColor: 'bg-[#a855f7]', label: 'N' },      // F#4 - Purple
    'm': { freq: 415.30, color: 'bg-[#db2777]', activeColor: 'bg-[#ec4899]', label: 'M' },      // G#4 - Pink
    '0': { freq: 1760.00, color: 'bg-[#b91c1c]', activeColor: 'bg-[#dc2626]', label: '0' },     // A6 - Red
    '1': { freq: 1975.53, color: 'bg-[#c2410c]', activeColor: 'bg-[#ea580c]', label: '1' },     // B6 - Orange
    '2': { freq: 2093.00, color: 'bg-[#a16207]', activeColor: 'bg-[#ca8a04]', label: '2' },     // C7 - Yellow
    '3': { freq: 2349.32, color: 'bg-[#15803d]', activeColor: 'bg-[#16a34a]', label: '3' },     // D7 - Green
    '4': { freq: 2637.02, color: 'bg-[#0f766e]', activeColor: 'bg-[#0d9488]', label: '4' },     // E7 - Teal
    '5': { freq: 2793.83, color: 'bg-[#1d4ed8]', activeColor: 'bg-[#2563eb]', label: '5' },     // F7 - Blue
    '6': { freq: 3135.96, color: 'bg-[#4338ca]', activeColor: 'bg-[#4f46e5]', label: '6' },     // G7 - Indigo
    '7': { freq: 3520.00, color: 'bg-[#7e22ce]', activeColor: 'bg-[#9333ea]', label: '7' },     // A7 - Purple
    '8': { freq: 3951.07, color: 'bg-[#be185d]', activeColor: 'bg-[#db2777]', label: '8' },     // B7 - Pink
    '9': { freq: 4186.01, color: 'bg-[#9f1239]', activeColor: 'bg-[#be185d]', label: '9' }      // C8 - Rose
  }
  // Initialize AudioContext once
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playSound = useCallback((frequency: number, key: string) => {
    setActiveKey(key)

    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)

    setTimeout(() => setActiveKey(null), 200)
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()
      if (keyMap[key]) {
        event.preventDefault()
        playSound(keyMap[key].freq, key)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [playSound])

  return (
    <div className=' w-full h-full flex p-2 sm:p-4 md:p-8'
      style={{
        padding: "clamp(0.5rem,0.75vw,200rem)"
      }}
    >
      <div className='w-full mono flex flex-col gap-2 sm:gap-3'>

        <div className='flex w-full gap-1 sm:gap-2 md:gap-3 justify-center mb-2 sm:mb-3'>
          {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'q', 'w'].map((key) => (
            <button
              key={key}
              onClick={() => playSound(keyMap[key].freq, key)}
              className={`${activeKey === key ? keyMap[key].activeColor : keyMap[key].color} hover:opacity-80 cursor-pointer active:scale-95 transition-all duration-150 shadow-lg hover:shadow-2xl w-full aspect-[3/5] sm:aspect-[3/5]  text-white font-bold text-xs sm:text-sm md:text-base`}
              aria-label={`Sound key ${key}`}
            >
              <span className='hidden sm:inline'>{key.toUpperCase()}</span>
            </button>
          ))}
        </div>

        <div className='flex gap-1 sm:gap-2 md:gap-3 justify-center mb-2 sm:mb-3'>
          {['e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f'].map((key) => (
            <button
              key={key}
              onClick={() => playSound(keyMap[key].freq, key)}
              className={`${activeKey === key ? keyMap[key].activeColor : keyMap[key].color} hover:opacity-80 active:scale-95 cursor-pointer transition-all duration-150  shadow-lg hover:shadow-2xl w-full aspect-[2/4] sm:aspect-[2/4] text-white font-bold text-xs sm:text-sm md:text-base`}
              aria-label={`Sound key ${key}`}
            >
              <span className='hidden sm:inline'>{key.toUpperCase()}</span>
            </button>
          ))}
        </div>

        <div className='flex gap-1 sm:gap-2 md:gap-3 justify-center mb-2 sm:mb-3 ml-0 sm:ml-4 md:ml-8'>
          {['g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'].map((key) => (
            <button
              key={key}
              onClick={() => playSound(keyMap[key].freq, key)}
              className={`${activeKey === key ? keyMap[key].activeColor : keyMap[key].color} hover:opacity-80 active:scale-95 transition-all duration-150 shadow-lg hover:shadow-2xl w-full cursor-pointer aspect-[3/5] sm:aspect-[3/5] text-white font-bold text-xs sm:text-sm md:text-base`}
              aria-label={`Sound key ${key}`}
            >
              <span className='hidden sm:inline'>{key.toUpperCase()}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Page