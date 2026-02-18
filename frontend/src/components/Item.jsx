import { TableCell, TableRow, IconButton, Chip } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = ({ item, onDeleteItem, onToggleItem, onIncreaseAmount, onDecreaseAmount}) => {
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
                <IconButton 
                    size="small" 
                    onClick={() => onDecreaseAmount(item.id)}
                    disabled={item.amount <= 0}
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
                <IconButton 
                    color="primary" 
                    onClick={() => onToggleItem(item.id)}
                    title={item.bought ? "Ripristina" : "Segna come fatto"}
                >
                    {item.bought ? <ReplayIcon /> : <CheckIcon />}
                </IconButton>
            </TableCell>
            <TableCell>
                <IconButton 
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
