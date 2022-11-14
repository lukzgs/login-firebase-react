import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../context/context';
import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';
import { GenericButton } from '../btns/GenericButton';

export const Navbar = ({ navigationData, currentRoute, setCurrentRoute }) => {
  const { user, setUser } = useContext(Context);
  // CONTINUAR https://dev.to/franciscomendes10866/create-a-responsive-navbar-using-react-and-tailwind-3768
  // OUTRO https://www.notimedad.dev/responsive-navbar-tailwind-react/
  console.log(user);

  const signingOut = () => {
    signOut(auth);
    localStorage.clear();
    setUser(null);
    return <Navigate to='/' />;
  };

  return (
    <header className='fixed w-screen'>
      <nav className='hidden md:flex flex-row items-center justify-between px-8 h-16 rounded-b-3xl bg-gray-900'>
        <ul className='flex flex-row self-end h-12'>
        </ul>
        <div
          id='btns-nav-right-side'
          className='flex'>
          <div className='py-3 px-3'>
            <Link to='/profile'>
              <img 
                src={ user?.photoURL || 'https://drowtales.com/wordpress/wp-content/uploads/2017/02/ga-sekhriat.jpg' } 
                className='rounded-full w-10 h-10'
              />
            </Link>
          </div>

          <GenericButton 
            div={{
              id: 'logout',
              className: 'py-3 px-3'
            }}
            button={{
              id: 'btn-logout',
              className: 'border-gray-900 bg-gray-100 border-2 text-sm text-gray-900 py-3 px-5 rounded-lg font-medium tracking-wide leading-none',
              onClick: signingOut,
              description: 'Logout'
            }} 
          />
        </div>
      </nav>
    </header>
  );
};
