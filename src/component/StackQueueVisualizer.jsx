import React, { useState } from 'react';
import './StackQueueVisualizer.css';

export default function StackQueueVisualizer() {
  // Stack state
  const [stack, setStack] = useState([]);
  const [stackInput, setStackInput] = useState('');

  // Queue state
  const [queue, setQueue] = useState([]);
  const [queueInput, setQueueInput] = useState('');

  // Stack handlers
  const handlePush = () => {
    if (stackInput !== '') {
      setStack([...stack, stackInput]);
      setStackInput('');
    }
  };
  const handlePop = () => {
    setStack(stack.slice(0, -1));
  };

  // Queue handlers
  const handleEnqueue = () => {
    if (queueInput !== '') {
      setQueue([...queue, queueInput]);
      setQueueInput('');
    }
  };
  const handleDequeue = () => {
    setQueue(queue.slice(1));
  };

  return (
    <div className="sq-container">
      <h2>Stack &amp; Queue Visualizer</h2>
      <div className="sq-section">
        <h3>Stack (LIFO)</h3>
        <div className="sq-controls">
          <input
            type="text"
            value={stackInput}
            onChange={e => setStackInput(e.target.value)}
            placeholder="Value"
          />
          <button onClick={handlePush}>Push</button>
          <button onClick={handlePop} disabled={stack.length === 0}>Pop</button>
        </div>
        <div className="stack-visual">
          {stack.map((item, idx) => (
            <div className="stack-item" key={idx}>
              {item}
            </div>
          )).reverse()}
        </div>
      </div>
      <div className="sq-section">
        <h3>Queue (FIFO)</h3>
        <div className="sq-controls">
          <input
            type="text"
            value={queueInput}
            onChange={e => setQueueInput(e.target.value)}
            placeholder="Value"
          />
          <button onClick={handleEnqueue}>Enqueue</button>
          <button onClick={handleDequeue} disabled={queue.length === 0}>Dequeue</button>
        </div>
        <div className="queue-visual">
          {queue.map((item, idx) => (
            <div className="queue-item" key={idx}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 32 }}>
        <h4>Time Complexity</h4>
        <div>
          <b>Stack:</b> Push/Pop O(1) &nbsp; <b>Space:</b> O(n)
          <br />
          <b>Queue:</b> Enqueue/Dequeue O(1) &nbsp; <b>Space:</b> O(n)
        </div>
      </div>
    </div>
  );
}