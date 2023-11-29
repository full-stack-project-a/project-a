// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AuthComponent from './components/auth/AuthComponent';
// import Formtable from './components/product/Formtable';
// import ProductPage from './components/product/ProductPage';
// import ProductCard from './components/product/CardStyle';
// import DetailPage from './components/product/DetailPage';

function App() {
   return (
      <Router>
         <div className="App">
            <Header />
            <Routes>
               {/* Define your routes here */}
               <Route path="/signin" element={<AuthComponent currPage="signin" />} />
               <Route path="/signup" element={<AuthComponent currPage="signup" />} />
               <Route path="/updatePassword" element={<AuthComponent currPage="updatePassword" />} /> 
               /* Add more routes as needed */
            </Routes>
            <Footer />
         </div>
      </Router>
   );
}

export default App;