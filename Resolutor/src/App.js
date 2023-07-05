import logo from './logo.svg';
import './App.css';

import FormsResolutor from './pages/FormsResolutor/Forms.jsx'
import TabelaDenuncia from './pages/TabelaDenuncia/Tabela.jsx'

import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<TabelaDenuncia/>}/>
            <Route path='/forms/:id1' element={<FormsResolutor/>}/>
          </Routes>
        </BrowserRouter>


    </>
  );
}

export default App;
