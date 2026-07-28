import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<Placeholder title="About" />} />
          <Route path="/courses" element={<Placeholder title="Courses" />} />
          <Route path="/faculty" element={<Placeholder title="Faculty" />} />
          <Route path="/timetable" element={<Placeholder title="Timetable" />} />
          <Route path="/fees" element={<Placeholder title="Fees" />} />
          <Route path="/admissions" element={<Placeholder title="Admissions" />} />
          <Route path="/testimonials" element={<Placeholder title="Testimonials" />} />
          <Route path="/blog" element={<Placeholder title="Blog" />} />
          <Route path="/contact" element={<Placeholder title="Contact" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
