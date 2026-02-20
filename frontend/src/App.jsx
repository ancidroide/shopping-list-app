import { useState, useEffect, useMemo } from 'react'
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme, IconButton, Fab } from '@mui/material'
import ShoppingList from './components/ShoppingList'
import ShoppingForm from './components/ShoppingForm'
import itemService from './services/items'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const App = () => {
  const [items, setItems] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  
  useEffect(() => {
    itemService.getAll()
      .then(data => setItems(data))
  }, [])

  // Create theme based on dark mode state
  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  }), [darkMode])

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4, position: 'relative', minHeight: '100vh' }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Lista della Spesa 🛒
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Tieni traccia di ciò che devi comprare
          </Typography>
        </Box>

        <ShoppingForm onAddItem={addItem} />
      

        <ShoppingList 
          items={items} 
          deleteItem={deleteItem} 
          toggleItem={toggleItem}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
        />

        {/* Dark Mode Toggle - Bottom Right */}
        <Fab 
          color={darkMode ? "warning" : "primary"} 
          size="medium"
          onClick={toggleDarkMode}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          title={darkMode ? "Passa a tema chiaro" : "Passa a tema scuro"}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </Fab>
      </Container>
    </ThemeProvider>
  )
}

export default App
