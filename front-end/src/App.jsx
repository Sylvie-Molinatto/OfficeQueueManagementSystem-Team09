import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MessageContext from './messageCtx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Toast } from 'react-bootstrap';
import { ClientLayout, OfficerLayout, MonitorLayout } from './components/pageLayout';
import { useState } from 'react';
import './App.css'
import { Navigation } from './components/Navigation';

function App() {

  const [message, setMessage] = useState('');

  // If an error occurs, the error message will be shown in a toast.
  const handleErrors = (err) => {
    let msg = '';
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = err.message;
    setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
  }

  return (
    <>
    <BrowserRouter>
      <MessageContext.Provider value={{handleErrors}}>
        <Container fluid className="no-padding">
          <Navigation/>
          <Toast show={message !== ''} onClose={() => setMessage('')} delay={4000} autohide className="d-inline-block m-1 toast" bg="danger">
            <Toast.Body>{ message }</Toast.Body>
          </Toast>
          <Routes>
            <Route path="/" element={<ClientLayout/>}/>
            <Route path="/Officer" element={<OfficerLayout/>}/>
            <Route path="/Monitor" element={<MonitorLayout/>}/>
          </Routes>
        </Container>
      </MessageContext.Provider>
    </BrowserRouter>
    </>
  )
}

export default App
