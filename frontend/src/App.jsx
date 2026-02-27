import { useState, useEffect, useMemo } from 'react'
import { Container, Typography, Box, CssBaseline, ThemeProvider, createTheme, IconButton, Fab, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert, CircularProgress } from '@mui/material'
import ShoppingList from './components/ShoppingList'
import ShoppingForm from './components/ShoppingForm'
import itemService from './services/items'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

const DEFAULT_CATEGORIES = [
  'Frutta', 
  'Verdura', 
  'Carne',
  'Pesce',
  'Latticini',
  'Casa',
  'Altro',
  'Tutte'
]

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
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES)

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
    setIsLoading(true)

    itemService.createItem(newItem)
      .then(data => {
        setItems([...items, data])
        setIsLoading(false)
        showNotification('Elemento aggiunto con successo!', 'success')
      })
      .catch(error => {
        setIsLoading(false)
        showNotification('Errore nell\'aggiunta dell\'elemento', 'error')
        console.error(error)
      })
  }

  const deleteItem = (id) => {
    setIsLoading(true)
    itemService.removeItem(id)
    .then(() => {
      setItems(items.filter(item => item.id !== id))
      setIsLoading(false)
      showNotification('Elemento rimosso con successo', 'success')
    })
    .catch(error => {
      setIsLoading(false)
      showNotification('Errore nella rimozione dell\'elemento', 'error')
      console.error(error)
    })
  }

  // from bought to not toggle
  const toggleItem = (id) => {
    setIsLoading(true)

    const itemToUpdate = items.find(item => item.id === id)
    const updatedItem = { ...itemToUpdate, bought: !itemToUpdate.bought }
    
    itemService.updateItem(id, updatedItem)
      .then(returnedItem => {
        setItems(items.map(item => item.id !== id ? item : returnedItem))
        setIsLoading(false)
        showNotification('Elemento aggiornato con successo', 'success')
      })
      .catch(error => {
        setIsLoading(false)
        showNotification('Errore nell\'aggiornamento dell\'elemento', 'error')
        console.error(error)
      })
  }

  // increase amount
  const increaseAmount = (id) => {
    setIsLoading(true)
    
    const itemToIncrease = items.find(item => item.id === id)
    const increasedItem = { ...itemToIncrease, amount: itemToIncrease.amount + 1 }

    itemService.updateItem(id, increasedItem)
      .then(returnedItem => {
        setItems(items.map(item => item.id !== id ? item : returnedItem))
        setIsLoading(false)
        showNotification('Quantità aumentata con successo', 'success')
      })
      .catch(error => {
        setIsLoading(false)
        showNotification('Errore nell\'incremento della quantità', 'error')
        console.error(error)
      })
  }


  // decrease amount
  const decreaseAmount = (id) => {
    setIsLoading(true)

    const itemToDecrease = items.find(item => item.id === id)
    const decreasedItem = { ...itemToDecrease, 
      amount: itemToDecrease.amount > 0 ? itemToDecrease.amount - 1 : 0}

    itemService.updateItem(id, decreasedItem)
      .then(returnedItem => {
        setItems(items.map(item => item.id !== id ? item : returnedItem))
        setIsLoading(false)
        showNotification('Quantità diminuita con successo', 'success')
      })
      .catch(error => {
        setIsLoading(false)
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
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', py: 4 }}>
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

        <ShoppingForm 
          onAddItem={addItem} 
          isLoading={isLoading}
          categories={categories.filter(c => c !== 'Tutte')} />

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

            {['Tutte', ...categories].map(cat => (
              <MenuItem value={cat}>{cat}</MenuItem>
            ))}

          </Select>
        </FormControl>

        <ShoppingList 
          items={filteredItems} 
          deleteItem={deleteItem} 
          toggleItem={toggleItem}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
          isLoading={isLoading}
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
