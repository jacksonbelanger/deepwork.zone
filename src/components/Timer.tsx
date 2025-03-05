'use client';

import { useState, useEffect, useLayoutEffect } from 'react';

export default function Timer() {
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default to work mode (25 minutes)
  const [isRunning, setIsRunning] = useState(false);

  // Calculate formatted time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Update title - moved into useEffect to avoid SSR issues
  useLayoutEffect(() => {
    document.title = `${formattedTime} - ${mode === 'work' ? 'Working' : 'Break'}`;
  }, [timeLeft, mode, formattedTime]);

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
        marginBottom: '0rem',
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
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        padding: '0.75rem 2rem',
        fontSize: '1.2rem',
        cursor: 'pointer',
        borderRadius: '8px',
        fontFamily: 'var(--font-geist-sans)',
        transition: 'all 0.15s ease-out',
        transform: isRunning ? 'translateY(3px)' : 'translateY(0)',
        boxShadow: isRunning 
          ? 'inset 0 3px 6px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.2)' 
          : '0 3px 6px rgba(0, 0, 0, 0.2), 0 12px 24px rgba(0, 0, 0, 0.25), 0 16px 32px rgba(0, 0, 0, 0.15), inset 0 -2px 4px rgba(255, 255, 255, 0.1)',
        position: 'relative',
        width: '220px',
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: '0.5px',
        outline: 'none',
        userSelect: 'none',
      }}
    >
      {isRunning ? 'Pause' : 'Start'}
    </button>
  );
} 