import React, { useState } from 'react';
import './SearchingVisualizer.css';

const DEFAULT_ARRAY = [7, 2, 9, 4, 1, 5, 8, 3, 6];

export default function SearchingVisualizer() {
  const [array, setArray] = useState([...DEFAULT_ARRAY]);
  const [searchValue, setSearchValue] = useState('');
  const [algorithm, setAlgorithm] = useState('linear');
  const [currentIdx, setCurrentIdx] = useState(null);
  const [foundIdx, setFoundIdx] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  function reset() {
    setCurrentIdx(null);
    setFoundIdx(null);
    setIsSearching(false);
  }

  function handleArrayChange(e) {
    const arr = e.target.value
      .split(',')
      .map(x => parseInt(x, 10))
      .filter(x => !isNaN(x));
    setArray(arr);
    reset();
  }

  function handleSearchValueChange(e) {
    setSearchValue(e.target.value);
    reset();
  }

  function handleAlgorithmChange(e) {
    setAlgorithm(e.target.value);
    reset();
  }

  async function startSearch() {
    reset();
    setIsSearching(true);
    if (algorithm === 'linear') {
      for (let i = 0; i < array.length; i++) {
        setCurrentIdx(i);
        await new Promise(res => setTimeout(res, 300));
        if (array[i] === Number(searchValue)) {
          setFoundIdx(i);
          setIsSearching(false);
          return;
        }
      }
      setIsSearching(false);
    } else if (algorithm === 'binary') {
      // Binary search requires sorted array
      const sorted = [...array].sort((a, b) => a - b);
      setArray(sorted);
      let left = 0, right = sorted.length - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        setCurrentIdx(mid);
        await new Promise(res => setTimeout(res, 400));
        if (sorted[mid] === Number(searchValue)) {
          setFoundIdx(mid);
          setIsSearching(false);
          return;
        } else if (sorted[mid] < Number(searchValue)) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      setIsSearching(false);
    }
  }

   return (
    <div className="searching-container">
      <h2>Searching Visualizer</h2>
     <div className="searching-controls">
  <label>
    Array:&nbsp;
    <input
      type="text"
      value={array.join(',')}
      onChange={handleArrayChange}
      disabled={isSearching}
      style={{ width: 180 }}
    />
    <button
      type="button"
      onClick={() => { setArray([...array, 0]); reset(); }}
      disabled={isSearching}
      style={{ marginLeft: 8 }}
    >+</button>
    <button
      type="button"
      onClick={() => { if(array.length > 1) { setArray(array.slice(0, -1)); reset(); } }}
      disabled={isSearching || array.length <= 1}
      style={{ marginLeft: 4 }}
    >-</button>
  </label>
  &nbsp;&nbsp;
  <label>
    Search Value:&nbsp;
    <input
      type="number"
      value={searchValue}
      onChange={handleSearchValueChange}
      disabled={isSearching}
      style={{ width: 60 }}
    />
  </label>
  &nbsp;&nbsp;
  <label>
    Algorithm:&nbsp;
    <select value={algorithm} onChange={handleAlgorithmChange} disabled={isSearching}>
      <option value="linear">Linear Search</option>
      <option value="binary">Binary Search</option>
    </select>
  </label>
  &nbsp;&nbsp;
  <button onClick={startSearch} disabled={isSearching || !searchValue}>
    Start Search
  </button>
</div>
      <div className="searching-array">
        {array.map((num, idx) => (
          <div
            key={idx}
            className={
              'searching-bar' +
              (foundIdx === idx ? ' found' : currentIdx === idx ? ' current' : '')
            }
          >
            {num}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <h4>Time Complexity</h4>
        {algorithm === 'linear' ? (
          <div>
            <b>Best:</b> O(1) &nbsp; <b>Average/Worst:</b> O(n)
            <br />
            <b>Space:</b> O(1)
          </div>
        ) : (
          <div>
            <b>Best:</b> O(1) &nbsp; <b>Average/Worst:</b> O(log n)
            <br />
            <b>Space:</b> O(1)
          </div>
        )}
      </div>
    </div>
  );
}