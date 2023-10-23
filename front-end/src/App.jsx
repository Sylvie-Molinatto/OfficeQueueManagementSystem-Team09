import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ClientLayout, LoginLayout } from './components/pageLayout';
import './App.css'
import { Navigation } from './components/Navigation';

function App() {

  return (
    <>
    <BrowserRouter>
        <Container fluid className="App over-footer">
          <Navigation/>
          <Routes>
            <Route path="/" element={<ClientLayout/>}/>
            <Route path="/login" element={<LoginLayout/>}/>
          </Routes>
        </Container>
    </BrowserRouter>
    </>
  )
}

export default App
