'use client';

import { useState, useEffect } from 'react';
import Heatmap from './Heatmap';

export default function Timer() {
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default to work mode (25 minutes)
  const [isRunning, setIsRunning] = useState(false);

  // Handle mode change
  useEffect(() => {
    // Reset timer when mode changes
    if (mode === 'work') {
      setTimeLeft(25 * 60); // 25 minutes for work
    } else {
      setTimeLeft(5 * 60); // 5 minutes for break
    }
    setIsRunning(false); // Stop timer when switching modes
  }, [mode]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    
    const timerInterval = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, [timeLeft, isRunning]);

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: '1',
      paddingTop: '5%',
    }}>
      <ModeToggle mode={mode} setMode={setMode} />

      <TimerDisplay formattedTime={formattedTime} />
      
      <StartStopButton isRunning={isRunning} setIsRunning={setIsRunning} />
      
      <Heatmap />
    </div>
  );
}

function ModeToggle({ mode, setMode }: { mode: string, setMode: (mode: string) => void }) {
  return (
    <div style={{
      display: 'flex',
      backgroundColor: '#222',
      borderRadius: '6px',
      padding: '0.25rem',
      width: '240px',
    }}>
      <button
        onClick={() => setMode('work')}
        style={{
          padding: '0.5rem 0',
          borderRadius: '4px',
          border: 'none',
          fontSize: '0.875rem',
          fontWeight: mode === 'work' ? 'bold' : 'normal',
          backgroundColor: mode === 'work' ? 'white' : 'transparent',
          color: mode === 'work' ? 'black' : 'white',
          cursor: 'pointer',
          transition: 'all 0.2s',
          flex: 1,
          textAlign: 'center',
        }}
      >
        Work
      </button>
      <button
        onClick={() => setMode('break')}
        style={{
          padding: '0.5rem 0',
          borderRadius: '4px',
          border: 'none',
          fontSize: '0.875rem',
          fontWeight: mode === 'break' ? 'bold' : 'normal',
          backgroundColor: mode === 'break' ? 'white' : 'transparent',
          color: mode === 'break' ? 'black' : 'white',
          cursor: 'pointer',
          transition: 'all 0.2s',
          flex: 1,
          textAlign: 'center',
        }}
      >
        Break
      </button>
    </div>
  );
}

function TimerDisplay({ formattedTime }: { formattedTime: string }) {
  return (
    <div 
      style={{
        color: 'white',
        fontSize: '7rem',
        fontWeight: 'bold',
        fontFamily: 'var(--font-geist-sans)',
        userSelect: 'none',
        marginBottom: '0.3rem',
        letterSpacing: '-2px',
      }}
    >
      {formattedTime}
    </div>
  );
}

function StartStopButton({ isRunning, setIsRunning }: { isRunning: boolean, setIsRunning: (isRunning: boolean) => void }) {
  return (
    <button
      onClick={() => setIsRunning(!isRunning)}
      style={{
        backgroundColor: 'transparent',
        color: 'white',
        border: '1px solid white',
        padding: '0.75rem 2rem',
        fontSize: '1.2rem',
        cursor: 'pointer',
        borderRadius: '4px',
        fontFamily: 'var(--font-geist-sans)',
        transition: 'all 0.1s ease-in-out',
        transform: isRunning ? 'translateY(3px)' : 'translateY(0)',
        boxShadow: isRunning 
          ? 'none' 
          : '0 3px 0 0 rgba(255, 255, 255, 0.3)',
        position: 'relative',
        width: '220px',
        textAlign: 'center',
      }}
    >
      {isRunning ? 'Stop' : 'Start'}
    </button>
  );
} 