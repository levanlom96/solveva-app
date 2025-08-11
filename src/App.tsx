import { JSX } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/app.provider.tsx';
import Navigation from './components/Navigation/Navigation.tsx';
import Footer from './components/Footer/Footer.tsx';

import Home from './pages/Home/Home.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';

import TravelRouteBuilder from './pages/TravelRouteBuilder/TravelRouteBuilder.tsx';
import '@xyflow/react/dist/style.css';

const App: () => JSX.Element = () => {
  return (
    <AppProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/builder' element={<TravelRouteBuilder />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AppProvider>
  );
};

export default App;
