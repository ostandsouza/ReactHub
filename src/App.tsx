import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css';
import AppNavbar from './components/AppNavbar'
import GlobalState from './context/GlobalState';
import './App.css';

const App: React.FC = () => {
  return (  
    <GlobalState>
    <div className="App">
      <AppNavbar userName="Ostan"/>
    </div>
    </GlobalState>
  );
}

export default App;
