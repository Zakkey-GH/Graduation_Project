import React from 'react';

const ScatterPlot = () => {
  const colors = [
    'rgba(200, 200, 175)', // Salmon pink
    'rgba(191, 190, 135)', // Pink
    'rgba(198, 194, 116)', // Blue
    'rgba(207, 201, 71)', // Light blue
    'rgba(184, 159, 55)', // Coral
    'rgba(173, 133, 61)', // Light green
    'rgba(125, 118, 58)'  // Light yellow
  ];

  const data = [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 4, y: 1 },
    { x: 5, y: 2 }
  ];

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <svg viewBox="0 0 6 8" className="w-full h-auto">
        {/* Color bands */}
        {colors.map((color, index) => (
          <rect
            key={index}
            x="0"
            y={7 - index}
            width="6"
            height="1"
            fill={color}
          />
        ))}

        {/* Axes */}
        <line x1="0" y1="7" x2="6" y2="7" stroke="black" strokeWidth="0.05" />
        <line x1="0" y1="0" x2="0" y2="7" stroke="black" strokeWidth="0.05" />

        {/* Data points */}
        {data.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={7 - point.y}
            r="0.2"
            fill="black"
          />
        ))}

        {/* Lines connecting points */}
        {data.map((point, index) => {
          if (index < data.length - 1) {
            const nextPoint = data[index + 1];
            return (
              <line
                key={`line-${index}`}
                x1={point.x}
                y1={7 - point.y}
                x2={nextPoint.x}
                y2={7 - nextPoint.y}
                stroke="black"
                strokeWidth="0.05"
              />
            );
          }
          return null;
        })}

        {/* Axis labels */}
        <text x="5.8" y="7.3" fontSize="0.3" textAnchor="end">元回目</text>
        <text x="-0.3" y="0.5" fontSize="0.3" transform="rotate(-90 -0.3,0.5)">カラーコード</text>
      </svg>
    </div>
  );
};

export default ScatterPlot;