const Item = ({ item, onDeleteItem, onToggleItem }) => {
    return (
        <tr>
            <td>Oggetto: {item.name}</td>
            <td>Quantità: {item.amount}</td>
            <td>{item.bought ? ' Acquistato' : 'Da comprare'}</td>

            <td>
                <button onClick={() => onToggleItem(item.id)}>{item.bought ? 'Ripristina' : 'Fatto'}</button>
            </td>
            <td>
                <button onClick={() => onDeleteItem(item.id)}>Cancella</button>
            </td>
        </tr>        
    )
}

export default Item