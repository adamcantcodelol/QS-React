import React, { useState } from 'react';
import './index.css';

function QueueSystem() {
  const [queue, setQueue] = useState([]);
  const [name, setName] = useState('');
  const [counter, setCounter] = useState(1);

  const registerPerson = () => {
    if (name.trim() === '') return;
    const newPerson = { id: counter, name: name.trim(), time: new Date() };
    setQueue(prev => [...prev, newPerson]);
    setCounter(prev => prev + 1);
    setName('');
  };

  const removeFirstRow = () => {
    setQueue(prev => prev.slice(2));
  };

  const removeByName = () => {
    setQueue(prev => prev.filter(p => p.name !== name.trim()));
    setName('');
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < queue.length; i += 2) {
      rows.push(
        <tr key={i}>
          <td>{queue[i]?.name || ''}</td>
          <td>{queue[i + 1]?.name || ''}</td>
        </tr>
      );
    }
    return rows;
  };

  return (
    <div className="queue-container">
      <div className="table-responsive">
        <table className="queue-table">
          <thead>
            <tr>
              <th>Player 1</th>
              <th>Player 2</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <div className="button-group">
          <button onClick={registerPerson}>Register</button>
          <button onClick={removeFirstRow}>Remove First</button>
          <button onClick={removeByName}>Remove Self</button>
        </div>
      </div>
    </div>
  );
}

export default QueueSystem;
