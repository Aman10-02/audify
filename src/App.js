import { Routes, Route } from 'react-router-dom';

//Components
import MyNavbar from './components/Navbar';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Pages
import HomePage from './pages/Home';

function App() {
  return (
    <div>
    <MyNavbar />
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/login" element={<h1>Login</h1>}></Route>
    </Routes>
    </div>
  );
}

export default App;
