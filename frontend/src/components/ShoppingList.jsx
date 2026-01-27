import Item from "./Item"

const ShoppingList = ({ items, deleteItem, toggleItem }) => {
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
                    <Item key={item.id} item={item} onDeleteItem={deleteItem} onToggleItem={toggleItem}/>
                     ))}
                </tbody>
                
            </table>
        </div>
    )
}

export default ShoppingList