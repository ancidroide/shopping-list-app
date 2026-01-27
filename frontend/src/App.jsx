import { useState } from 'react'
import ShoppingList from './components/ShoppingList'
import ShoppingListForm from './components/ShoppingForm'
import itemService from './services/items'


const App = () => {
  const [items, setItems] = useState([
  { id: 1, name: 'Latte', amount: 2, bought: false },
  { id: 2, name: 'Uova', amount: 6, bought: true },
  { id: 3, name: 'Pane', amount: 1, bought: false }
])

// add items to the list
const addItem = (newItem) => {
    setItems([...items, newItem])
}

// delete items from the list
const deleteItem = (id) => {
  setItems(items.filter(item => item.id !== id))
}

// from bought to not toggle
const toggleItem = (id) => {
  const updatedItems = items.map(item => 
    item.id === id ? {...item, bought: !item.bought} : item
  )
  setItems(updatedItems)
}


return (
  <div>
    <ShoppingListForm onAddItem={addItem} />

    <ShoppingList 
      items={items} 
      deleteItem={deleteItem} 
      toggleItem={toggleItem}
    />

  </div>

)

}


export default App
