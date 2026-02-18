import { useState } from "react"
import { TextField, Button, Box, Paper } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

const ShoppingForm = ({ onAddItem }) => {
    const [newItemName, setNewItemName] = useState('')

    const handleNewItemName = (event) => {
        setNewItemName(event.target.value)
    }

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
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box 
                component="form" ShoppingForm
                onSubmit={handleSubmit}
                sx={{ 
                    display: 'flex', 
                    gap: 2,
                    alignItems: 'center'
                }}
            >
                <TextField 
                    variant="outlined"
                    size="small"
                    placeholder="Aggiungi elemento..."
                    value={newItemName}
                    onChange={handleNewItemName}
                    sx={{ flexGrow: 1 }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                    startIcon={<AddIcon />}
                >
                    Aggiungi
                </Button>
            </Box>
        </Paper>
    )
}

export default ShoppingForm
