import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Tables from './components/Table';


export const App: React.FunctionComponent = () => {
  return (
    <main>
         <Header />
         <Tables />
         <Footer />
    </main>
  );
};
