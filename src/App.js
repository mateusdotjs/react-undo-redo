import React from 'react';
import './App.css';

function App() {

  const [points, setPoints] = React.useState([])
  const [undone, setUndone] = React.useState([])

  function handleClick(e) {
    const obj = {
      clientY: e.clientY,
      clientX: e.clientX
    }

    setPoints((prev) => [...prev, obj])
  }

  function handleUndoClick(e) {
    e.stopPropagation()
    const newArr = points.slice()
    const lastUndone = newArr.pop()
    setUndone((prev) => [...prev, lastUndone])
    setPoints(newArr)
  }

  function handleRedoClick(e) {
    e.stopPropagation()
    const copy = undone.slice()
    const redo = copy.pop()
    setUndone(copy)
    setPoints((prev) => [...prev, redo])
  }

  return (
    <div className="app" onClick={(e) => handleClick(e)}>
      <button
        onClick={(e) => handleUndoClick(e)}
        disabled={points.length > 0 ? false : true}>
        Undo
      </button>

      <button
        onClick={(e) => handleRedoClick(e)}
        disabled={undone.length > 0 ? false : true}>
        Redo
      </button>

      {
        points.map((point, index) => {
          return <div
            key={index}
            className='point'
            style={{ top: point.clientY, left: point.clientX }}>
          </div>
        })
      }
    </div>
  );
}

export default App;
