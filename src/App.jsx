import './App.css'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom'
import { MantineProvider, createTheme, Box, Button } from '@mantine/core'
import { NoteBookPage } from './pages/NoteBookPage';
import { HeaderMenu } from './pages/HeaderMenu'
import { HomePage } from './pages/HomePage'
import { TeamsPage } from './pages/TeamsPage'
import { EventsPage } from './pages/EventsPage'
import { Footer } from './pages/Footer'
import { Publications } from './pages/Publications'


//#8e8820

const myColors = {
  'mapol-lavender': [
    '#eeeefc',
    '#d8d8f2',
    '#adade7',
    '#817fdd',
    '#5c59d5',
    '#4540d0',
    '#3934cf',
    '#2c28b7',
    '#2623a4',
    '#1d1d91',
  ],
  'mapol-violet': [
    '#f8e9ff',
    '#e8cfff',
    '#cd9bff',
    '#b164ff',
    '#9a36fe',
    '#8b19fe',
    '#8409ff',
    '#7100e4',
    '#6400cc',
    '#5600b4',
  ],
}

// Create the theme
const myTheme = createTheme({
  colors: myColors,
  primaryColor: 'mapol-violet', // Set the primary color to your custom color
  components: {
    Button: {
      defaultProps: {
        size: 'lg', // Change default size globally
      },
      styles: () => ({
        root: {
          fontSize: '18px',
        },
      }),
    },
  },
})
function App() {
  return (
    <MantineProvider theme={myTheme}>
      <BrowserRouter>
        <div>
          <header>
            <HeaderMenu />
          </header>
          <Box
            style={{
              height: '100vh', // Use vh to set the height to 100% of the viewport
              width: '100%', // Width set to 100% for full page width
              overflow: 'auto', // Allows for scrolling if the content overflows
            }}
          >
            <Routes>
              <Route path="/mapol-web/" element={<HomePage />} />
              <Route path="/mapol-web/home" element={<HomePage />} />
              <Route path="/mapol-web/team" element={<TeamsPage />} />
              <Route path="/mapol-web/notebook" element={<NoteBookPage />} />
              <Route path="/mapol-web/publications" element={<Publications />} />
              <Route path="/mapol-web/events" element={<EventsPage />} />
            </Routes>
          </Box>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
