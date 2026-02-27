import { TableCell, TableRow, IconButton, Chip, Checkbox } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';


const Item = ({ item, onDeleteItem, onToggleItem, onIncreaseAmount, onDecreaseAmount, isLoading }) => {
    return (
        <TableRow 
            sx={{ 
                '&:hover': { backgroundColor: 'action.hover' },
                backgroundColor: item.bought ? 'action.disabledBackground' : 'inherit'
            }}
        >
            <TableCell sx={{ fontWeight: item.bought ? 'normal' : 'bold' }}>
                {item.name}
            </TableCell>
            <TableCell>
                <Chip
                    label={item.category}
                    size="small"
                    sx={{ mx: 1, minWidth: 30 }}
                />

            </TableCell>
            <TableCell>
                <IconButton 
                    size="small" 
                    onClick={() => onDecreaseAmount(item.id)}
                    disabled={item.amount <= 1 || isLoading}
                >
                    <RemoveIcon fontSize="small" />
                </IconButton>
                <Chip 
                    label={item.amount} 
                    size="small" 
                    sx={{ mx: 1, minWidth: 30 }}
                    color={item.amount === 0 ? "error" : "default"}
                />
                <IconButton 
                    size="small" 
                    onClick={() => onIncreaseAmount(item.id)}
                    disabled={item.amount >= 999 || isLoading}
                >
                    <AddIcon fontSize="small" />
                </IconButton>
            </TableCell>
            <TableCell>
                <Chip 
                    label={item.bought ? "Acquistato" : "Da comprare"} 
                    color={item.bought ? "success" : "warning"}
                    size="small"
                />
            </TableCell>

            <TableCell>
                <Checkbox
                    disabled={isLoading}
                    checked={item.bought}
                    size='small'
                    onClick={() => onToggleItem(item.id)}
                    title={item.bought ? 'Ripristina' : 'Segna come fatto'}    
                />
            </TableCell>
            
            <TableCell>
                <IconButton
                    disabled={isLoading} 
                    color="error" 
                    onClick={() => onDeleteItem(item.id)}
                    title="Elimina"
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>        
    )
}

export default Item
