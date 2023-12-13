import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoadingScreen from './pages/Home/LoadingScreen';
import AuthComponent from './components/auth/AuthComponent';
import ProductPage from './components/product/ProductPage';
import DetailPage from './components/product/DetailPage';
import Formtable from './components/product/Formtable';
import Checkout from './components/checkout/Checkout';
import ErrorPage from './components/error/ErrorPage';
// import Formtable from './components/product/Formtable';
// import ProductPage from './components/product/ProductPage';
// import ProductCard from './components/product/CardStyle';
// import DetailPage from './components/product/DetailPage';


const AppContent = () => {
   const { isLoading, auth } = useAppContext();
   const isVendor = auth.isAuthenticated && auth.user && auth.user.role === 'vendor';

   return (
      <>
         <div className="App">
            <Header />
            <div className="main-content">
               <Routes>
                  {/* Define your routes here */}
                  <Route path="/signin" element={<AuthComponent currPage="signin" />} />
                  <Route path="/signup" element={<AuthComponent currPage="signup" />} />
                  <Route path="/updatePassword" element={<AuthComponent currPage="updatePassword" />} />
                  <Route path="/products" element={<ProductPage />} />
                  <Route path="/products/1" element={<DetailPage />} />
                  {/* <Route path="/products/new" element={<Formtable />} /> */}
                  {/* Conditional rendering for protected route */}
                  <Route path="/products/new" element={
                     isVendor ? <Formtable /> : <Navigate to="/" replace />
                  } />

                     <Route path="/checkout" element={<Checkout />} />
                     <Route path="/error" element={<ErrorPage />} />
                  {/* Add more routes as needed */}
               </Routes>
            </div>
            <Footer />
         </div>
         {isLoading && <LoadingScreen />}
      </>
   );
};

function App() {
   return (
      <AppProvider>
         <Router>
            <AppContent />
         </Router>
      </AppProvider>
   );
}

export default App;