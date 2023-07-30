import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Home from './Components/Home';
import CoinDetails from './Components/CoinDetails';
import Coins from './Components/Coins';
import Header from './Components/Header';
import Exchanges from './Components/Exchanges';
import Footer from './Components/Footer';



function App() {
  return (
   <Router>
    <Header/>
    <Routes>
      <Route path={'/'} element={<Home/>} />
      <Route path={'/coins'} element={<Coins/>} />
      <Route path={'/coin/:id'} element={<CoinDetails/>} />
      <Route path={'/exchanges'} element={<Exchanges/>} />
    </Routes>
    <Footer/>
   </Router>
  );
}

export default App;
