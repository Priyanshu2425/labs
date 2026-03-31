import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AILab from './pages/AILab';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Product from './pages/Product';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-lab" element={<AILab />} />
        <Route path="/our-services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
