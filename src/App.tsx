// src/App.tsx
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import AluminumBilling from './pages/AluminumBilling';
import HardwareBilling from './pages/HardwareBilling'; 
import AluminumBills from './pages/AluminumBills';
import HardwareBills from './pages/HardwareBills';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AluminumBilling />} />
        <Route path="/hardware" element={<HardwareBilling />} />
        <Route path="/aluminum-bills" element={<AluminumBills />} />
        <Route path="/hardware-bills" element={<HardwareBills />} />
      </Routes>
    </BrowserRouter>
  );
}
