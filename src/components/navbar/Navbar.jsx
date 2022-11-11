import React, { useContext } from 'react';
// import { CgMonday } from 'react-icons/cg';
// import classNames from 'classnames';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../context/context';
import { auth } from '../../services/firebase';
import { signOut } from 'firebase/auth';
import { GenericButton } from '../btns/GenericButton';

export const Navbar = ({ navigationData, currentRoute, setCurrentRoute }) => {
  const { user, setUser } = useContext(Context);
  // CONTINUAR https://dev.to/franciscomendes10866/create-a-responsive-navbar-using-react-and-tailwind-3768
  console.log(user);

  const signingOut = () => {
    signOut(auth);
    localStorage.clear();
    setUser(null);
    return <Navigate to='/' />;
  };

  return (
    <nav 
      className='hidden md:flex flex-row items-center justify-between px-8 h-18 rounded-b-3xl bg-gray-900'
    >
      <span className='text-5xl text-gray-800 -mb-1'>
      </span>
      <ul 
        className='flex flex-row self-end h-12'
      >
        {/* { navigationData.map((item, index) => (
          <li
            className='w-22 text-gray-400 hover:text-gray-700 cursor-pointer font-medium tracking-wide text-sm flex items-start justify-center'
            key={index}
            onClick={() => setCurrentRoute(item)}
          >
            {item}
          </li>
        ))} */}
      </ul>
      <div
        id='btns-nav-right-side'
        className='flex'
      >
        <div
          className='py-3 px-3'>
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
  );
};


// .navbar {
//   @apply hidden md:flex flex-row items-center justify-between px-8 h-18 rounded-b-3xl bg-white;
// }

// .logo {
//   @apply text-5xl text-gray-800 -mb-1;
// }

// .navItems {
//   @apply flex flex-row self-end h-12;
// }

// .navItem {
//   @apply w-22 text-gray-400 hover:text-gray-700 cursor-pointer font-medium tracking-wide text-sm flex items-start justify-center;
// }

// .selectedNavItem {
//   @apply text-gray-700 border-b-3 border-gray-700 bg-gradient-to-b from-white to-gray-100;
// }

// .actions {
//   @apply bg-white hover:bg-gray-50 border-2 border-gray-900 text-sm text-gray-900 py-3 px-5 rounded-lg font-medium tracking-wide leading-none;
// }