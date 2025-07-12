import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();

  return (
    <div className="bg-bg text-text font-sans flex flex-col min-h-screen">
      <Header activePath={location.pathname} />
      <main className="flex-grow">
        <Outlet /> {/* This is where the page components will be rendered */}
      </main>
      <Footer />
    </div>
  );
};

export default App;