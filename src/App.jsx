import { useState } from 'react';

import './App.css';
import SelectableGrid from './components/SelectableGrid';
import VirtualScroll from './components/VirtualScroll';

function App() {
  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

  return (
    <div>
      {/* <h1>Selectable Grid</h1> */}
      {/* <SelectableGrid rows={10} cols={10} /> */}
      <div className="virtual-container">
        <VirtualScroll list={items} />
      </div>
    </div>
  );
}

export default App;
