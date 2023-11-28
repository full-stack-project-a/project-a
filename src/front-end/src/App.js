// import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AuthComponent from './components/auth/AuthComponent';
import Formtable from './components/product/Formtable';
import ProductPage from './components/product/ProductPage';
import ProductCard from './components/product/CardStyle';
import DetailPage from './components/product/DetailPage';

function App() {
  return (
    <div className="App">
      <Header /> 
      {/* <AuthComponent /> */}
      {/* <Formtable /> */}
      {/* <ProductPage /> */}
      
      {/* <ProductCard /> */}
      <DetailPage />
      <Footer /> 
    </div>
  );
}

export default App;
