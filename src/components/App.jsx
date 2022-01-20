import { useEffect, useState } from 'react'
import '../styles/App.css'
import { ImCross } from 'react-icons/im';


const App = () => {
  const [item, setItem] = useState('')
  const [list, setList] = useState([])
  
  const handleOnChange = e => setItem(e.target.value)
  
  const handleKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setList([...list, {"label": item, "done": false}])
      setItem('')
    }
  }

  const handleClick = e => {
    const filt = list.filter((_,x) => {
      return (x != e.currentTarget.id)
    })
    setList(filt)
  }

  useEffect(() => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/davemontero')
      .then(response => response.json())
      .then(data => setList(data))
  }, [])

  useEffect(() => {
    if (list.length > 0) {
      const config = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
      }
      fetch('https://assets.breatheco.de/apis/fake/todos/user/davemontero', config)
    }
  }, [list])

  return (
    <div className="todo-container">
      <h1 className='todo-title'>todos</h1>
      <ul className="todo">
        <li>
          <input 
            autoFocus
            type="text" 
            className='todo-input'
            name='add'
            placeholder='Ingresar item'
            value={item}
            onChange={handleOnChange}
            onKeyPress={handleKey}
          />
        </li>
        {
          list ? list.map((i,ix) => <li className='todo-item' key={ix} >{i.label} <span id={ix} onClick={handleClick}><ImCross className='delete'/></span></li>) : ''
        }
        {
          list ? <li className='todo-item todo-counter'>{ list.length === 1 ? `${list.length} item left` : `${list.length} items left` }</li> : null
        }
      </ul>
    </div>
  )
}

export default App