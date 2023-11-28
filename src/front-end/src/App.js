// import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AuthComponent from './components/auth/AuthComponent';
import Formtable from './components/product/Formtable';

function App() {
  return (
    <div className="App">
      <Header /> 
      {/* <AuthComponent /> */}
      <Formtable />
      <Footer /> 
    </div>
  );
}

export default App;
