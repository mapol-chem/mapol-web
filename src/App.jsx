
import './App.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { AppHeader } from './pages/AppHeader';
import { MantineProvider, createTheme } from '@mantine/core';
import { NoteBookPage } from './pages/NoteBookPage';
import { HeaderMenu } from './pages/HeaderMenu';
import { HomePage } from './pages/HomePage';
import { TeamsPage } from './pages/TeamsPage';
import { EventsPage } from './pages/EventsPage';


//#8e8820

const myColors = {
  'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
  'mapol-yellow': [
    "#fbfae8",
    "#f3f2d9",
    "#e6e3b5",
    "#d8d48d",
    "#ccc66b",
    "#c4be56",
    "#c1ba49",
    "#a9a339",
    "#969130",
    "#817d22"
  ],
  'mapol-lavender': [
    "#eeeefc",
    "#d8d8f2",
    "#adade7",
    "#817fdd",
    "#5c59d5",
    "#4540d0",
    "#3934cf",
    "#2c28b7",
    "#2623a4",
    "#1d1d91"
  ],
  'mapol-violet': [
    "#f8e9ff",
    "#e8cfff",
    "#cd9bff",
    "#b164ff",
    "#9a36fe",
    "#8b19fe",
    "#8409ff",
    "#7100e4",
    "#6400cc",
    "#5600b4"
  ]
};

// Create the theme
const myTheme = createTheme({
  colors: myColors,
  primaryColor: 'mapol-violet', // Set the primary color to your custom color
  // You can also customize other theme properties here
});
function App() {
  return (

    <MantineProvider theme={myTheme}>
      <BrowserRouter>
    <div >
      <header >
       <HeaderMenu/>
      </header>

      <Routes>
            
            <Route path="/mapol-web/" element={<HomePage />} />
            <Route path="/mapol-web/home" element={<HomePage />} />
            <Route path="/mapol-web/notebook" element={<NoteBookPage />} /> 
            <Route path="/mapol-web/team" element={<TeamsPage />} />
            <Route path="/mapol-web/events" element={<EventsPage />} />
          </Routes>
         
    </div>
    </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
