import { useEffect, useState } from 'react'
import ToDo from './ToDo';
function App() {
  const [todos, setToDos] = useState([]);
  const [content, setContent] = useState('')
  useEffect(() => {
    const getToDos = async () => {
      try {
        const response = await fetch('/api/todo');
        if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();
        setToDos(json);
        console.log(json);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    getToDos();
  }, []);

  const createToDo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/todo', {
        method: "POST",
        body: JSON.stringify({ task: content }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("Failed to create todo");
      const data = await res.json();
      setContent('');
      setToDos([...todos, data]); // array spread operation
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };
  return (
    <div className='container'>
      <h1 className='caption'>ToDos List</h1>
      <form onSubmit={createToDo} className='form'>
        <input
          placeholder='Enter new to do here'
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className='newtodo'
        />
        <button className='create'>Create ToDo</button>
      </form>
      {todos.map((todo) => (
        <ToDo todo={todo} key={todo._id} setToDos={setToDos} />// separate ToDo Component created 
      ))}
    </div>
  )
}
export default App
