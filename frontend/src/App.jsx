import { useState, useEffect, useMemo } from 'react'
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme, IconButton, Fab, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert, CircularProgress } from '@mui/material'
import ShoppingList from './components/ShoppingList'
import ShoppingForm from './components/ShoppingForm'
import itemService from './services/items'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const App = () => {
  const [items, setItems] = useState([])
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('shopping-list-theme') === 'true'
    return saved ? JSON.parse(saved) : false
  })
  const [filteredCategory, setFilteredCategory] = useState('Tutte')
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  })
  const [isLoading, setIsLoading] = useState(false)

  // notification handling
  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity })
  } 

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false })
  }


  useEffect(() => {
    itemService.getAll()
      .then(data => {
        setItems(data)
        setIsLoading(false)
      })
      .catch(error => {
        showNotification('Errore nel caricamento della lista', 'error')
        setIsLoading(false)
        console.error(error)
      })
  }, [])

  useEffect(() => {
    localStorage.setItem('shopping-list-theme', JSON.stringify(darkMode))
  }, [darkMode])


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
      .then(data => {
        setItems([...items, data])
        showNotification('Elemento aggiunto con successo!', 'success')
      })
      .catch(error => {
        showNotification('Errore nell\'aggiunta dell\'elemento', 'error')
        console.error(error)
      })
  }

  const deleteItem = (id) => {
    itemService.removeItem(id)
    .then(() => {
      setItems(items.filter(item => item.id !== id))
      showNotification('Elemento rimosso con successo', 'success')
    })
    .catch(error => {
      showNotification('Errore nella rimozione dell\'elemento', 'error')
      console.error(error)
    })
  }

  // from bought to not toggle
  const toggleItem = (id) => {
    const itemToUpdate = items.find(item => item.id === id)
    const updatedItem = { ...itemToUpdate, bought: !itemToUpdate.bought }
    
    itemService.updateItem(id, updatedItem)
      .then(returnedItem => {
        setItems(items.map(item => item.id !== id ? item : returnedItem))
        showNotification('Elemento aggiornato con successo', 'success')
      })
      .catch(error => {
        showNotification('Errore nell\'aggiornamento dell\'elemento', 'error')
        console.error(error)
      })
  }

  // increase amount
  const increaseAmount = (id) => {
    const itemToIncrease = items.find(item => item.id === id)
    const increasedItem = { ...itemToIncrease, amount: itemToIncrease.amount + 1 }

    itemService.updateItem(id, increasedItem)
      .then(returnedItem => {
        setItems(items.map(item => item.id !== id ? item : returnedItem))
        showNotification('Quantità aumentata con successo', 'success')
      })
      .catch(error => {
        showNotification('Errore nell\'incremento della quantità', 'error')
        console.error(error)
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
        showNotification('Quantità diminuita con successo', 'success')
      })
      .catch(error => {
        showNotification('Errore nella diminuzione della quantità', 'error')
        console.error(error)
      })
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const filteredItems = items.filter(item => filteredCategory === 'Tutte' || item.category === filteredCategory)

  const handleFilterCategory = (event) => {
    setFilteredCategory(event.target.value)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}
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

        <FormControl fullWidth>
          <InputLabel id="categoryLabel">Category</InputLabel>
          <Select
            value={filteredCategory}
            labelId='categoryLable'
            label='category'
            onChange={handleFilterCategory}
            size='small'
            sx={{ flexFlow: 1 }}
          >
            <MenuItem value={'Tutte'}>Tutte</MenuItem>
            <MenuItem value={'Frutta'}>Frutta</MenuItem>
            <MenuItem value={'Verdura'}>Verdura</MenuItem>
            <MenuItem value={'Carne'}>Carne</MenuItem>
            <MenuItem value={'Pesce'}>Pesce</MenuItem>
            <MenuItem value={'Latticini'}>Latticini</MenuItem>
            <MenuItem value={'Casa'}>Casa</MenuItem>
            <MenuItem value={'Altro'}>Altro</MenuItem>
          </Select>
        </FormControl>

        <ShoppingList 
          items={filteredItems} 
          deleteItem={deleteItem} 
          toggleItem={toggleItem}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
        />

        <Snackbar
          open={notification.open}
          autoHideDuration={4000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseNotification} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>

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
