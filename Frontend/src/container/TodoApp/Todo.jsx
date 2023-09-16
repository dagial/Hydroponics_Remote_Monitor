import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import './Todo.css';

function Todo() {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);

  function handleInputChange(event) {
    setNewItem(event.target.value);
  }

  function handleAddItem() {
    if (!newItem) {
      alert('Please enter a Todo item');
      return;
    }

    const newItemObject = { id: Date.now(), value: newItem };
    setItems((oldItems) => [...oldItems, newItemObject]);
    setNewItem('');
  }

  function handleDeleteItem(itemId) {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
  }

  return (
    <div>
        <div className='Todo-app'>
        <h4>What's the plan for today?</h4>
            <div className="input-todo todo-form">
            <div  class="input-group mb-3">
                  <input  type="text" class="input-todo form-control" placeholder="Add a Todo"  value={newItem} onChange={handleInputChange}/>
                    {/* <div class="todo-button input-group-append">
                        <button  class="todo-btn btn btn-outline-success" type="button" onClick={handleAddItem}>Add</button>
                    </div> */}
            </div>
            </div>

            <div className='todo-list'>
                {items.map((item) => (
                    

                    <div class="todo-check custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input"  />
                    <label><p key={item.id}>
                    {item.value}
                        <span onClick={() => handleDeleteItem(item.id)}>
                        <AiOutlineClose size={22} />
                        </span>
                     </p></label>
                    </div>
                
                ))}
            </div>
        </div>
      
    </div>
  );
}

export default Todo;
