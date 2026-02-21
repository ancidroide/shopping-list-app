import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material"
import Item from "./Item"

const ShoppingList = ({ items, deleteItem, toggleItem, increaseAmount, decreaseAmount }) => {
    if (items.length === 0) {
        return (
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                    La lista è vuota. Aggiungi un elemento!
                </Typography>
            </Paper>
        )
    }

    return (
        <TableContainer component={Paper} elevation={2}>
            <Table sx={{ minWidth: 650 }} aria-label="shopping list">
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'primary.main' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nome</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Categoria</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantità</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Stato</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Check</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Elimina</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <Item key={item.id} 
                            item={item} 
                            onDeleteItem={deleteItem} 
                            onToggleItem={toggleItem}
                            onIncreaseAmount={increaseAmount}
                            onDecreaseAmount={decreaseAmount}
                        />
                    ))}
                </TableBody>
            </Table>
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                    Totale elementi: {items.length} | 
                    Da comprare: {items.filter(i => !i.bought).length} | 
                    Acquistati: {items.filter(i => i.bought).length}
                </Typography>
            </Box>
        </TableContainer>
    )
}

export default ShoppingList
