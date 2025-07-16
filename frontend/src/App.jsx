import './App.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { MantineProvider, createTheme, Box, Container } from '@mantine/core';
import { HeaderMenu } from './pages/HeaderMenu';
import { HomePage } from './pages/HomePage';
import { TeamsPage } from './pages/TeamsPage';
import { EventsPage } from './pages/EventsPage';
import { Footer } from './pages/Footer';
import { Publications } from './pages/Publications';
import { HighlightsPage } from './pages/HighlightsPage';
import { NoteBookPage } from './pages/NoteBookPage';

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


'mapol-dark': [
  "#f5f5f5",
  "#e7e7e7",
  "#cdcdcd",
  "#b2b2b2",
  "#9a9a9a",
  "#8b8b8b",
  "#848484",
  "#717171",
  "#656565",
  "#000000"
]
};
// Create the theme
const myTheme = createTheme({
  colors: myColors,
  primaryColor: 'mapol-dark', // Set the primary color to your custom color
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
});
function App() {
  // Use basename only for production/GitHub Pages, not for local development
  const basename = process.env.NODE_ENV === 'production' ? '/mapol-web' : '';
  
  return (
    <MantineProvider theme={myTheme}>
      <BrowserRouter basename={basename}>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', // Ensures the Box takes the full height
            justifyContent: 'space-between', // Push footer to bottom
          }}
        >
          <HeaderMenu />
          <Container
            fluid
            py={'30px'}
            px={{ base: '20px', sm: '50px', md: '100px', lg: '150px' }}
            style={{ flex: '1', width: '100%' }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/team" element={<TeamsPage />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/highlights" element={<HighlightsPage />} />
              <Route path="/notebook" element={<NoteBookPage />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
