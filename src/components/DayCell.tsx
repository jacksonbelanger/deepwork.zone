import React from 'react';

interface DayCellProps {
    value: number
}

export default function DayCell({ value }: DayCellProps) {
    const getColor = (value: number) => {
        switch (value) {
            case 1:
                return '#2D2D2D';
            case 2:
                return '#5D5D5D';
            case 3:
                return '#8A8A8A';
            case 4:
                return 'C5C5C5';
            case 5:
                return '#FFFFFF';
            default:
                return '#2D2D2D';
        }
    };

    const color = getColor(value);

    return(
        <div className="rounded-none" style={{ backgroundColor: color, width: '12px', height: '12px', borderRadius: '1.9px', margin: 0, padding: 0 }}></div>
    )
} 