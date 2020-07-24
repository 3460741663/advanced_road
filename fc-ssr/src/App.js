import React from 'react';
import { useState } from 'react'
import Example from './component/example/Example'
import './App.css';

function App() {
  let [count, setCount] = useState(0);
  setTimeout(() => {
    setCount(count + 1);
  }, 1000);
  return (
    <div className="App">
      <Example count={count} />
    </div>
  );
}

export default App;
