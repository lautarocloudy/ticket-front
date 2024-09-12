import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <AppRoutes />
      {/* <Footer /> */}
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
