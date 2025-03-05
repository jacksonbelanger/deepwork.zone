import React from 'react';
import DayCell from './DayCell';

export default function Heatmap() {
    const months = [
        { label: 'Jan', column: 0 },
        { label: 'Feb', column: 5 },
        { label: 'Mar', column: 9 },
        { label: 'Apr', column: 14 },
        { label: 'May', column: 18 },
        { label: 'Jun', column: 22 },
        { label: 'Jul', column: 27 },
        { label: 'Aug', column: 31 },
        { label: 'Sep', column: 36 },
        { label: 'Oct', column: 40 },
        { label: 'Nov', column: 44 },
        { label: 'Dec', column: 49 },
    ];

    // Create array of 53 columns, each containing appropriate cells
    const columns = Array.from({ length: 53 }, (_, colIndex) => {
        const isFirstColumn = colIndex === 0;
        const isLastColumn = colIndex === 52;
        
        let cellsToRender;
        if (isFirstColumn) {
            // First column: only render bottom 4 cells (indices 3-6)
            cellsToRender = Array.from({ length: 7 }, (_, cellIndex) => {
                if (cellIndex < 3) {
                    // Return empty div with same height to maintain spacing
                    return <div key={`${colIndex}-${cellIndex}`} style={{ height: '12px' }}></div>;
                }
                const cellNumber = (colIndex * 7) + cellIndex;
                return <DayCell key={`${colIndex}-${cellIndex}`} value={0} index={cellNumber - 3} />;
            });
        } else if (isLastColumn) {
            // Last column: only render top 4 cells (indices 0-3)
            cellsToRender = Array.from({ length: 7 }, (_, cellIndex) => {
                if (cellIndex > 3) {
                    // Return empty div with same height to maintain spacing
                    return <div key={`${colIndex}-${cellIndex}`} style={{ height: '12px' }}></div>;
                }
                const cellNumber = (colIndex * 7) + cellIndex;
                return <DayCell key={`${colIndex}-${cellIndex}`} value={0} index={cellNumber - 3} />;
            });
        } else {
            // Regular columns: render all 7 cells
            cellsToRender = Array.from({ length: 7 }, (_, cellIndex) => {
                const cellNumber = (colIndex * 7) + cellIndex;
                return <DayCell key={`${colIndex}-${cellIndex}`} value={0} index={cellNumber - 3} />;
            });
        }

        return (
            <div key={colIndex} className="flex flex-col gap-1">
                {cellsToRender}
            </div>
        );
    });

    return (
        <>
            <div className="w-[930px] mx-auto mt-25">
                <p className="text-white mb-2 text-lg font-medium ml-2">0 hours deep in 2025</p>
                <div className="h-[200px] border-1 rounded-xl bg-transparent mb-50 p-[18px]" style={{ borderColor: '#2D2D2D' }}>
                    <div className="flex">
                        {/* Day labels */}
                        <div className="flex flex-col mr-[12px] text-xs text-white font-semibold">
                            <div className="h-[25px]"></div> {/* Month row space */}
                            <div className="h-[16px]"></div> {/* 1st row space */}
                            <div className="h-[16px]">Mon</div> {/* 2nd row */}
                            <div className="h-[16px]"></div> {/* 3rd row space */}
                            <div className="h-[16px]">Wed</div> {/* 4th row */}
                            <div className="h-[16px]"></div> {/* 5th row space */}
                            <div className="h-[16px]">Fri</div> {/* 6th row */}
                            <div className="h-[16px]"></div> {/* 7th row space */}
                        </div>
                        <div>
                            {/* Month labels */}
                            <div className="relative h-[25px]">
                                {months.map(({label, column}) => (
                                    <div key={label} className="absolute text-xs text-white font-semibold " style={{ left: `${column * 16}px` }}>
                                        {label}
                                    </div>
                                ))}
                            </div>
                            {/* Grid of cells */}
                            <div className="flex gap-[4px]">
                                {columns}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
} 