'use client'

import React, { useState, useEffect, useCallback } from 'react'

const Page = () => {
  const [activeKey, setActiveKey] = useState<string | null>(null)

  // Map keyboard keys to frequencies (musical notes)
  const keyMap: { [key: string]: { freq: number; color: string; label: string } } = {
    'a': { freq: 261.63, color: 'bg-red-500', label: 'A' },      // C4
    's': { freq: 293.66, color: 'bg-orange-500', label: 'S' },   // D4
    'd': { freq: 329.63, color: 'bg-yellow-500', label: 'D' },   // E4
    'f': { freq: 349.23, color: 'bg-green-500', label: 'F' },    // F4
    'g': { freq: 392.00, color: 'bg-teal-500', label: 'G' },     // G4
    'h': { freq: 440.00, color: 'bg-blue-500', label: 'H' },     // A4
    'j': { freq: 493.88, color: 'bg-indigo-500', label: 'J' },   // B4
    'k': { freq: 523.25, color: 'bg-purple-500', label: 'K' },   // C5
    'l': { freq: 587.33, color: 'bg-pink-500', label: 'L' },     // D5
    'q': { freq: 659.25, color: 'bg-rose-500', label: 'Q' },     // E5
    'w': { freq: 698.46, color: 'bg-cyan-500', label: 'W' },     // F5
    'e': { freq: 783.99, color: 'bg-lime-500', label: 'E' },     // G5
    'r': { freq: 880.00, color: 'bg-emerald-500', label: 'R' },  // A5
    't': { freq: 987.77, color: 'bg-sky-500', label: 'T' },      // B5
    'y': { freq: 1046.50, color: 'bg-violet-500', label: 'Y' },  // C6
    'u': { freq: 1174.66, color: 'bg-fuchsia-500', label: 'U' }, // D6
    'i': { freq: 1318.51, color: 'bg-amber-500', label: 'I' },   // E6
    'o': { freq: 1396.91, color: 'bg-red-400', label: 'O' },     // F6
    'p': { freq: 1567.98, color: 'bg-orange-400', label: 'P' },  // G6
    'z': { freq: 196.00, color: 'bg-yellow-400', label: 'Z' },   // G3
    'x': { freq: 220.00, color: 'bg-green-400', label: 'X' },    // A3
    'c': { freq: 246.94, color: 'bg-teal-400', label: 'C' },     // B3
    'v': { freq: 277.18, color: 'bg-blue-400', label: 'V' },     // C#4
    'b': { freq: 311.13, color: 'bg-indigo-400', label: 'B' },   // D#4
    'n': { freq: 369.99, color: 'bg-purple-400', label: 'N' },   // F#4
    'm': { freq: 415.30, color: 'bg-pink-400', label: 'M' }      // G#4
  }

  const playSound = useCallback((frequency: number, key: string) => {
    setActiveKey(key)
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
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
    <div className='min-h-screen w-full h-full flex items-center justify-center p-8'>
      <div className='max-w-6xl w-full'>
       
        
        {/* Top Row - QWERTY */}
        <div className='flex gap-3 justify-center mb-3'>
          {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map((key) => (
            <button
              key={key}
              onClick={() => playSound(keyMap[key].freq, key)}
              className={`${keyMap[key].color} hover:opacity-80 active:scale-95 transition-all duration-150 rounded-lg shadow-lg hover:shadow-2xl w-16 h-16 ${
                activeKey === key ? 'scale-110 shadow-2xl ring-4 ring-white' : ''
              }`}
              aria-label={`Sound key ${key}`}
            >
              <span className='text-white font-bold text-2xl uppercase'>{key}</span>
            </button>
          ))}
        </div>

        {/* Middle Row - ASDF */}
        <div className='flex gap-3 justify-center mb-3 ml-8'>
          {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map((key) => (
            <button
              key={key}
              onClick={() => playSound(keyMap[key].freq, key)}
              className={`${keyMap[key].color} hover:opacity-80 active:scale-95 transition-all duration-150 rounded-lg shadow-lg hover:shadow-2xl w-16 h-16 ${
                activeKey === key ? 'scale-110 shadow-2xl ring-4 ring-white' : ''
              }`}
              aria-label={`Sound key ${key}`}
            >
              <span className='text-white font-bold text-2xl uppercase'>{key}</span>
            </button>
          ))}
        </div>

        {/* Bottom Row - ZXCV */}
        <div className='flex gap-3 justify-center mb-3 ml-20'>
          {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((key) => (
            <button
              key={key}
              onClick={() => playSound(keyMap[key].freq, key)}
              className={`${keyMap[key].color} hover:opacity-80 active:scale-95 transition-all duration-150 rounded-lg shadow-lg hover:shadow-2xl w-16 h-16 ${
                activeKey === key ? 'scale-110 shadow-2xl ring-4 ring-white' : ''
              }`}
              aria-label={`Sound key ${key}`}
            >
              <span className='text-white font-bold text-2xl uppercase'>{key}</span>
            </button>
          ))}
        </div>
        
      </div>
    </div>
  )
}

export default Page