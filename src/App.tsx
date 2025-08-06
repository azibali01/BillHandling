// src/App.tsx
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import AluminumBilling from './pages/AluminumBilling';
import HardwareBilling from './pages/HardwareBilling'; // create soon

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AluminumBilling />} />
        <Route path="/hardware" element={<HardwareBilling />} />
      </Routes>
    </BrowserRouter>
  );
}
