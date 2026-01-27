'use client'

import React, { useState } from 'react'

const Page = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null)

  // Different musical notes and frequencies for each button
  const playSound = (frequency: number, buttonId: number) => {
    setActiveButton(buttonId)
    
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
    
    setTimeout(() => setActiveButton(null), 200)
  }

  const buttons = [
    { id: 1, size: 60, color: 'bg-red-500', freq: 261.63 },      // C4
    { id: 2, size: 80, color: 'bg-orange-500', freq: 293.66 },   // D4
    { id: 3, size: 100, color: 'bg-yellow-500', freq: 329.63 },  // E4
    { id: 4, size: 70, color: 'bg-green-500', freq: 349.23 },    // F4
    { id: 5, size: 120, color: 'bg-teal-500', freq: 392.00 },    // G4
    { id: 6, size: 90, color: 'bg-blue-500', freq: 440.00 },     // A4
    { id: 7, size: 110, color: 'bg-indigo-500', freq: 493.88 },  // B4
    { id: 8, size: 75, color: 'bg-purple-500', freq: 523.25 },   // C5
    { id: 9, size: 95, color: 'bg-pink-500', freq: 587.33 },     // D5
    { id: 10, size: 85, color: 'bg-rose-500', freq: 659.25 }     // E5
  ]

  return (
    <div className='min-h-screen w-full h-full  flex items-center justify-center p-8'>
      <div className='max-w-4xl w-full'>
        <h1 className='text-4xl font-bold text-white text-center mb-8'>
          Sound Board
        </h1>
        <p className='text-gray-300 text-center mb-12'>
          Click the squares to play different musical notes
        </p>
        
        <div className='flex flex-wrap gap-6 justify-center items-center'>
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => playSound(button.freq, button.id)}
              className={`${button.color} hover:opacity-80 active:scale-95 transition-all duration-150 rounded-lg shadow-lg hover:shadow-2xl ${
                activeButton === button.id ? 'scale-110 shadow-2xl' : ''
              }`}
              style={{
                width: `${button.size}px`,
                height: `${button.size}px`,
              }}
              aria-label={`Sound button ${button.id}`}
            >
              <span className='text-white font-bold text-lg'>{button.id}</span>
            </button>
          ))}
        </div>
        
        <div className='mt-12 text-center text-gray-400 text-sm'>
          <p>Each button plays a unique musical note from the scale</p>
        </div>
      </div>
    </div>
  )
}

export default Page