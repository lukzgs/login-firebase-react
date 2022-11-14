import React, { useContext, useEffect } from 'react';
import { Context } from '../../context/context';
import { Navbar } from '../../components/navbar/Navbar';
import { Footer } from '../../components/footer/Footer';

export const Home = () => {
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    const storageContent = () => {
      const localToken = localStorage.getItem('@AuthFirebase: token');
      const localUser = localStorage.getItem('@AuthFirebase: user');
      if (localToken && localUser) { setUser(JSON.parse(localUser)); }
    };

    storageContent();
  }, []);

  return (
    <div className='bg-gray-400 flex flex-col h-screen justify-between'>
      <Navbar />
      <main className='h-screen p-4 mt-20 mb-20'>
        <h1>Home</h1>
        <h3>Welcome { user.displayName? user.displayName : user.email }</h3>
      </main>
      <Footer />
    </div>
  );
};