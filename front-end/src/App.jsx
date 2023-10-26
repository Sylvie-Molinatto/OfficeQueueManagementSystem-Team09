import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ClientLayout, OfficerLayout, MonitorLayout } from './components/pageLayout';
import './App.css'
import { Navigation } from './components/Navigation';

function App() {

  return (
    <>
    <BrowserRouter>
        <Container fluid className="no-padding">
          <Navigation/>
          <Routes>
            <Route path="/" element={<ClientLayout/>}/>
            <Route path="/Officer" element={<OfficerLayout/>}/>
            <Route path="/Monitor" element={<MonitorLayout/>}/>
          </Routes>
        </Container>
    </BrowserRouter>
    </>
  )
}

export default App
