import { useState, useEffect } from 'react'
import ShoppingList from './components/ShoppingList'
import ShoppingListForm from './components/ShoppingForm'
import itemService from './services/items'


const App = () => {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    itemService.getAll()
      .then(data => setItems(data))
  }, [])

// add items to the list
const addItem = (newItem) => {
  itemService.createItem(newItem)
    .then(data => setItems([...items, data]))
}

// delete items from the list
const deleteItem = (id) => {
  itemService.removeItem(id)
    .then(() => setItems(items.filter(item => item.id !== id)))
}

// from bought to not toggle
const toggleItem = (id) => {
  const itemToUpdate = items.find(item => item.id === id)
  const updatedItem = { ...itemToUpdate, bought: !itemToUpdate.bought }
  
  itemService.updateItem(id, updatedItem)
    .then(returnedItem => {
      setItems(items.map(item => item.id !== id ? item : returnedItem))
    }
  )
}

// increase amount
const increaseAmount = (id) => {
  const itemToIncrease = items.find(item => item.id === id)
  const increasedItem = { ...itemToIncrease, amount: itemToIncrease.amount + 1 }

  itemService.updateItem(id, increasedItem)
    .then(returnedItem => {
      setItems(items.map(item => item.id !== id ? item : returnedItem))
    })
}

// decrease amount
const decreaseAmount = (id) => {
  const itemToDecrease = items.find(item => item.id === id)
  const decreasedItem = { ...itemToDecrease, 
    amount: itemToDecrease.amount > 0 ? itemToDecrease.amount - 1 : 0}

  itemService.updateItem(id, decreasedItem)
    .then(returnedItem => {
      setItems(items.map(item => item.id !== id ? item : returnedItem))
    })
}

return (
  <div>
    <ShoppingListForm onAddItem={addItem} />

    <ShoppingList 
      items={items} 
      deleteItem={deleteItem} 
      toggleItem={toggleItem}
      increaseAmount={increaseAmount}
      decreaseAmount={decreaseAmount}
    />

  </div>

)

}


export default App
