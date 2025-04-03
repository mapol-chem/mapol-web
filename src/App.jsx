
import './App.css';
import '@mantine/core/styles.css';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { AppHeader } from './pages/AppHeader';
import { MantineProvider, createTheme } from '@mantine/core';
import { HeaderMenu } from './pages/HeaderMenu';
import { HomePage } from './pages/HomePage';
import { TeamsPage } from './pages/TeamsPage';

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
  ]
};

// Create the theme
const myTheme = createTheme({
  colors: myColors,
  primaryColor: 'ocean-blue', // Set the primary color to your custom color
  // You can also customize other theme properties here
});
function App() {
  return (
    <MantineProvider theme={myTheme}>
      <BrowserRouter>
    <div className="App">
      <header >
       <HeaderMenu/>
      </header>

      <Routes>
            
            <Route path="/test-app" element={<HomePage />} />
            <Route path="/test-app/home" element={<HomePage />} />
            <Route path="/test-app/team" element={<TeamsPage />} />
            
          </Routes>
         
    </div>
    </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
