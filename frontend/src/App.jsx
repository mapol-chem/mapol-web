import './App.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  HashRouter,
} from 'react-router-dom';
import { MantineProvider, createTheme, Box, Container } from '@mantine/core';
import { HeaderMenu } from './pages/HeaderMenu';
import { HomePage } from './pages/HomePage';
import { TeamsPage } from './pages/TeamsPage';
import { EventsPage } from './pages/EventsPage';
import { Footer } from './pages/Footer';
import { Publications } from './pages/Publications';
import { HighlightsPage } from './pages/HighlightsPage';
import { TutorialsPage } from './pages/TutorialsPage';

//#8e8820

const myColors = {
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
    '#d5d7e0',
    '#acaebf',
    '#8c8fa3',
    '#666980',
    '#4d4f66',
    '#34354a',
    '#2b2c3d',
    '#1d1e30',
    '#0c0d21',
    '#01010a',
  ],
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
    Anchor: {
      defaultProps: {
        underline: 'hover',
        c: '#4d4dff',
      },
    },
  },
});
function App() {
  return (
    <MantineProvider theme={myTheme}>
      <HashRouter>
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
              <Route path="/tutorials" element={<TutorialsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </HashRouter>
    </MantineProvider>
  );
}

export default App;
