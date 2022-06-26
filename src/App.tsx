import React, { useState } from 'react';
import './App.css';

function App() {

  const [value, setValue] = useState("");

  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    id: number;
    value: string;
    isCheck: boolean;
  };

  const handleChecked = (id: number,isCheck: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.isCheck = !isCheck
      }
      return todo;
    });

    setTodos(newTodos);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleEdit = (id: number,value: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.value = value
      }
      return todo;
    });

    setTodos(newTodos);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: todos.length,
      value: value,
      isCheck: false
    }
    
    setTodos([newTodo,...todos]);
    setValue("");
  }

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div>
        <h2>タイトル</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" onChange={(e) => handleChange(e)} className="inputText"></input>
          <input type="submit" value="save" className="submitButton"></input>
        </form>
        <ul className="todoList">
          {todos.map(todo => 
            <li key={todo.id}>
              <input 
                type="text" 
                onChange={(e) => handleEdit(todo.id,e.target.value)} 
                className="inputText"
                value={todo.value}
                disabled={todo.isCheck}
              />
              <input 
                type="checkbox" 
                onChange={(e) => handleChecked(todo.id,todo.isCheck)} 
              />
              <button onClick={(e) => handleDelete(todo.id)}>削除</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
