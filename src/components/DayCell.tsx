import React, { useState } from 'react';

interface DayCellProps {
    value: number,
    index: number
}

export default function DayCell({ value, index }: DayCellProps) {
    const [showTooltip, setShowTooltip] = useState(false);

    const getColor = (value: number) => {
        switch (value) {
            case 0:
                return '#2D2D2D';
            case 1:
                return '#5D5D5D';
            case 2:
                return '#8A8A8A';
            case 3:
                return '#C5C5C5';
            default:
                return '#FFFFFF';
        }
    };

    const color = getColor(value);

    return (
        <div className="relative">
            <div 
                className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs font-semibold text-[#FFF] bg-[#5D5D5D] rounded-md whitespace-nowrap transition-opacity duration-75 ease-in-out ${
                    showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{ zIndex: 50 }}
            >
                Index: {index}, Value: {value}
            </div>
            <div 
                className="rounded-none" 
                style={{ 
                    backgroundColor: color, 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '1.9px', 
                    margin: 0, 
                    padding: 0 
                }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            ></div>
        </div>
    );
} 