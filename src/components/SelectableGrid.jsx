import React, { useState } from 'react';

const SelectableGrid = ({ rows = 10, cols = 10 }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const [selectedBoxes, setSelectedBoxes] = useState([]);

  const handleMouseDown = (boxNumber) => {
    setIsMouseDown(true);
    setSelectedBoxes([boxNumber]);
  };

  const handleMouseEnter = (boxNumber) => {
    if (isMouseDown) {
      const startBox = selectedBoxes[0];
      const endBox = boxNumber;

      const startedRow = Math.floor((startBox - 1) / cols);
      const endedRow = Math.floor((endBox - 1) / cols);

      const startedCol = Math.floor((startBox - 1) % cols);
      const endedCol = Math.floor((endBox - 1) % cols);

      const selected = [];

      const minRow = Math.min(startedRow, endedRow);
      const maxRow = Math.max(startedRow, endedRow);
      const minCol = Math.min(startedCol, endedCol);
      const maxCol = Math.max(startedCol, endedCol);

      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          selected.push(row * cols + col + 1);
        }
      }
      console.log(selected);
      setSelectedBoxes(selected);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      className="grid"
      style={{ '--rows': rows, '--cols': cols }}
      onMouseUp={handleMouseUp}
    >
      {[...Array(rows * cols)].map((_, i) => (
        <div
          key={i}
          className={`box ${selectedBoxes.includes(i + 1) ? 'selected' : ''}`}
          onMouseDown={() => handleMouseDown(i + 1)}
          onMouseEnter={() => handleMouseEnter(i + 1)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default SelectableGrid;
