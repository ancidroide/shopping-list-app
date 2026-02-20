import { useState } from "react"
import { TextField, Button, Box, Paper, Select, MenuItem, FormControl, InputLabel,  } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

const ShoppingForm = ({ onAddItem }) => {
    const [newItemName, setNewItemName] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [category, setCategory] = useState('Altro')

    const handleNewItemName = (event) => {
        setNewItemName(event.target.value)
    }

    const handleQuantity = (event) => {
        setQuantity(event.target.value)
    }

    const handleCategory = (event) => {
        setCategory(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (newItemName.trim() === '') {
            return
        }
        
        const newItem = {
            id: Date.now(),
            name: newItemName,
            amount: quantity,
            bought: false,
            category: category
        }
        onAddItem(newItem)
        setNewItemName('')
        setQuantity(1)
        setCategory('Altro')
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
                    label='nome elemento'
                    size="small"
                    placeholder="Aggiungi elemento..."
                    value={newItemName}
                    onChange={handleNewItemName}
                    sx={{ flexGrow: 1 }}
                />

                <TextField
                    variant="outlined"
                    label='quantità'
                    type="number"
                    size="small"
                    value={quantity}
                    onChange={handleQuantity}
                    sx={{ flexGrow: 1 }}      
                />

                <FormControl>
                    <InputLabel id='categoria-label'>Categoria</InputLabel>
                    <Select
                        value={category}
                        labelId="categoria-label"
                        label='categoria'
                        onChange={handleCategory}
                        size="small"
                        sx={{ flexGrow: 1 }}
                    >
                        <MenuItem value={'Frutta'}>Frutta</MenuItem>
                        <MenuItem value={'Verdura'}>Verdura</MenuItem>
                        <MenuItem value={'Carne'}>Carne</MenuItem>
                        <MenuItem value={'Pesce'}>Pesce</MenuItem>
                        <MenuItem value={'Latticini'}>Latticini</MenuItem>
                        <MenuItem value={'Casa'}>Casa</MenuItem>
                        <MenuItem value={'Altro'}>Altro</MenuItem>

                    </Select>
                </FormControl>
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
