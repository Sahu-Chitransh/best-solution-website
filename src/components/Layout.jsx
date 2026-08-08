import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingSocials from './FloatingSocials';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0A0A0A]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingSocials />
    </div>
  );
}
