import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AuthComponent from './components/auth/AuthComponent';

function App() {
  return (
    <div className="App">
      <Header /> 
      <AuthComponent />
      <Footer /> 
    </div>
  );
}

export default App;
