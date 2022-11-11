import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../../context/context';
import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';

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

  const signingOut = () => {
    signOut(auth);
    localStorage.clear();
    setUser(null);
    return <Navigate to='/' />;
  };

  return (
    <main>
      <h1>Home</h1>
      <h3>Welcome { user.displayName? user.displayName : user.email }</h3>
      <button onClick={ () => signingOut() }>
        Sign Out
      </button>
    </main>
  );
};