import { useState } from "react"


const ShoppingListForm = ({ onAddItem }) => {
    const [newItemName, setNewItemName] = useState('')

    // function to show input text in newItemName form
    const handleNewItemName = (event) => {
        setNewItemName(event.target.value)
    }

    // function to handle submitting newItemName and erasing input form
    const handleSubmit = (event) => {
        event.preventDefault()
        if (newItemName.trim() === '') {
            return
        }
        
        const newItem = {
            id: Date.now(),
            name: newItemName,
            amount: 1,
            bought: false
     }
        onAddItem(newItem)
        setNewItemName('')
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    onChange={handleNewItemName}
                    value={newItemName}        
                />

                <button type="submit">Aggiungi elemento</button>
            </form>
        </div>
    )

}



export default ShoppingListForm