import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Upload from './components/Upload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Upload />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
