import React, { useContext, useEffect } from 'react';
import { Context } from '../../context/context';
import { Navbar } from '../../components/navbar/Navbar';

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
    <>
    <Navbar />
    <main className='w-screen h-screen'>
      <h1>Home</h1>
      <h3>Welcome { user.displayName? user.displayName : user.email }</h3>
    </main>
    </>
  );
};