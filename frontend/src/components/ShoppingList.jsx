import Item from "./Item"

const ShoppingList = ({ items, deleteItem, toggleItem, increaseAmount, decreaseAmount }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Quantità</th>
                        <th>Stato</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                    <Item key={item.id} 
                        item={item} 
                        onDeleteItem={deleteItem} 
                        onToggleItem={toggleItem}
                        onIncreaseAmount={increaseAmount}
                        onDecreaseAmount={decreaseAmount}
                    />
                     ))}
                </tbody>
                
            </table>
        </div>
    )
}

export default ShoppingList