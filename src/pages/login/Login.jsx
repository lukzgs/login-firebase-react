import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../context/context';
import { firestore, auth } from '../../services/firebase';
import { 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider ,
  signInWithPopup,
} from 'firebase/auth';

import { serverTimestamp, setDoc } from 'firebase/firestore';
import { FormInput } from '../../components/formInput/FormInput';
import { GenericButton } from '../../components/btns/GenericButton';
import { HandleError } from '../../services/errors/Errors';

import toast from 'react-hot-toast';

export const Login = () => {
  const { setUser, signed } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = new FormData(e.target);
    const email = Object.fromEntries(loginData.entries()).email;
    const password = Object.fromEntries(loginData.entries()).password;
    loginWithEmailAndPassword(email, password);
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user, 
        user: { 
          accessToken: token,
          email: userEmail,
          displayName,
          photoURL,
          uid,
        }
      } = result;
      setUser(user);
    }
    catch(e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user, 
        user: { accessToken: token, email, displayName, photoURL, uid } 
      } = result;
      setUser(user);
      const userProfileRef = firestore.collection('users').doc(uid);
      await setDoc(userProfileRef, { 
        email,
        name: displayName,
        username: null,
        avatarURL: photoURL,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      localStorage.setItem('@Google: token', token);
      localStorage.setItem('@Google: user', JSON.stringify(user));
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(error);
      console.log(errorCode, errorMessage, credential);
    }
  };

  const signInWithFacebook = async () => {
    const facebookProvider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const { user, 
        user: { accessToken: token, email, displayName, photoURL, uid } 
      } = result;
      setUser(user);
      const userProfileRef = firestore.collection('users').doc(uid);
      await setDoc(userProfileRef, { 
        email,
        name: displayName,
        username: null,
        avatarURL: photoURL,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      localStorage.setItem('@Facebook: token', token);
      localStorage.setItem('@Facebook: user', JSON.stringify(user));
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.error(error);
      console.log(errorCode, errorMessage, credential);
    }
  };

  const signInWithGithub = async () => {
    const githubAuthProvider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, githubAuthProvider);
      const { user, 
        user: { accessToken: token, email, displayName, photoURL, uid } 
      } = result;
      setUser(user);  
      const userProfileRef = firestore.collection('users').doc(uid);
      await setDoc(userProfileRef, { 
        email,
        name: displayName,
        username: null,
        avatarURL: photoURL,
        createdAt: serverTimestamp(),
        status: 'pending',
      });
      localStorage.setItem('@Github: token', token);
      localStorage.setItem('@Github: user', JSON.stringify(user));
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = GithubAuthProvider.credentialFromError(error);
      console.error(error);
      console.log(errorCode, errorMessage, credential);
    }
  };

  return (
    <div className='login-page flex justify-center h-screen w-screen bg-gradient-to-r from-stone-50 to-gray-900'>
      <div className='login-landpage'>
        <div
          id='title'
          className='text-center mt-24'>
          <div className='flex items-center justify-center'>
            <svg fill='none' viewBox='0 0 24 24' className='w-12 h-12 text-blue-500' stroke='currentColor'>
              <path strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'/>
            </svg>
          </div>

          <h2 className='text-4xl tracking-tight'>
            Sign in into your account
          </h2>

          <span className='text-sm'>
            or
            <br/>
            <Link to='/register' className='text-blue-300'>
              register a new account
            </Link>
          </span>
        </div>

        <div
          id='login-card'
          className='max-w-xl rounded-lg shadow-md px-6 pt-12 pb-6 md:mx-0 mx-4 mt-16 bg-white'>
          <form
            id='login-form'
            className="w-full max-w-xl rounded-lg pr-6 pl-6"
            onSubmit={ handleSubmit }>
            <div
              id='form-and-login-btn'
              className='flex flex-wrap -mx-3 -mb-3'>
              <FormInput
                name='email'
                div={{
                  id: 'email-login-form',
                  className: 'w-full md:w-full px-3 mb-6'
                }}
                label={{
                  className: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',
                  description: 'Email adress'
                }}
                input={{
                  id: 'email-login-input',
                  className: 'appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none',
                  type: 'email',
                  // required: true
                }} />

              <FormInput
                name='password'
                div={{ 
                  id: 'password-login-form',
                  className: 'w-full md:w-full px-3 mb-6' 
                }}
                label={{
                  className: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',
                  description: 'Password'
                }}
                input={{
                  id: 'password-login-input',
                  className: 'appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none',
                  type: 'password',
                  // required: true
                }} />

              <div className='w-full flex items-center justify-between px-3 mb-3'>
                <label className='flex items-center w-1/2'/>
                <div className='w-1/2 text-right'>
                  <Link to='/forgot-password' className="text-blue-500 text-sm tracking-tight">
                      Forget your password?
                  </Link>
                </div>
              </div>

              <GenericButton
                div={{
                  id:'login',
                  className: 'w-full md:w-full px-3 mb-6'
                }}
                button={{
                  id: 'btn-login',
                  className: 'appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:shadow-md focus:outline-none focus:bg-white focus:border-gray-500 bg-gradient-to-r from-fuchsia-500 to-cyan-500',
                  description: 'Login'
                }} />
            </div>
          
            <div
              id='sign-in-with'
              className='text-center flex-wrap'>
              <span className='text-center text-xs text-gray-700'>or sign up with</span>
            </div>
          </form>
        
          <div
            id='sign-in-btns'
            className='flex items-center w-full -mt-2'>
            <GenericButton
              div={{
                id: 'google',
                className: 'w-full md:w-1/3 ml-6 pt-6 pr-4 border-t border-gray-400'
              }}
              button={{
                id: 'btn-google',
                className: 'appearance-none flex items-center justify-center w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none',
                onClick: signInWithGoogle,
                svg: {
                  className: 'h-6 w-6 fill-current text-gray-700',
                  viewBox: '0 0 512 512',
                  path: {
                    d: `M231.5,183.5c2.8,10.7,2.7,20.8-0.5,30.4c-3.2,9.6-8.7,15.5-16.5,17.6h-5.3c-14.9,0-25.6-10.7-32-32
                    c-2.1-10.7-1.8-20.3,1.1-28.8c3.6-8.5,8.9-13.9,16-16c0.7-0.7,2.5-1.1,5.3-1.1C215.1,153.6,225.8,163.6,231.5,183.5 M256,0
                    c71.1,0,131.6,24.9,181.3,74.7S512,184.9,512,256c0,70.4-24.9,130.7-74.7,180.8S327.1,512,256,512c-70.4,0-130.7-25.1-180.8-75.2
                    S0,326.4,0,256c0-71.1,25.1-131.6,75.2-181.3S185.6,0,256,0 M241.1,365.9c21.3-10.7,32-28.1,32-52.3c0-15.6-9.2-32-27.7-49.1
                    c-9.2-7.8-13.9-13.5-13.9-17.1c0-4.3,3.6-8.9,10.7-13.9c12.1-12.1,18.1-26.3,18.1-42.7c0-20.6-6.4-34.5-19.2-41.6
                    c0.7-0.7,2.5-1.2,5.3-1.6c2.8-0.4,4.6-0.5,5.3-0.5c14.2-1.4,21.3-4.3,21.3-8.5v-2.1h-61.9c-4.3,0-10.1,0.7-17.6,2.1
                    c-7.5,1.4-16.9,7.1-28.3,17.1c-11.4,10-17.1,23.5-17.1,40.5c0,19.9,6.8,34.1,20.3,42.7c7.8,5.7,17.8,8.5,29.9,8.5h3.2
                    c-1.4,8.5,1.4,17.4,8.5,26.7h-1.1c-49.1,0-73.6,16.7-73.6,50.1c0,14.2,5,25.4,14.9,33.6c10,8.2,18.7,13,26.1,14.4
                    c7.5,1.4,14.4,2.1,20.8,2.1h2.1h2.1C215.8,374.4,229,371.6,241.1,365.9 M376.5,254.9v-25.6H336v-40.5h-25.6v40.5h-40.5v25.6h40.5
                    v40.5H336v-40.5H376.5 M209.1,285.9c11.4,0,20.6,3,27.7,9.1c7.1,6,11,13.7,11.7,22.9s-2.7,17.1-10.1,23.5
                    c-7.5,6.4-17.2,10-29.3,10.7c-12.1,1.4-22.8-0.5-32-5.9c-9.2-5.3-14.2-12.6-14.9-21.9c0-9.2,3.9-17.8,11.7-25.6
                    c7.1-7.1,17.4-11.4,30.9-12.8H209.1`
                  },
                }
              }}
            />

            <GenericButton 
              div={{
                id: 'facebook',
                className: 'w-full md:w-1/3 pt-6 px-2'
              }}
              button={{
                id: 'btn-facebook',
                className: 'appearance-none flex items-center justify-center w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none',
                onClick: signInWithFacebook,
                svg: {
                  className: 'h-6 w-6 fill-current text-gray-700',
                  viewBox: '0 0 512 512',
                  path: {
                    d: `M256,0C114.5,0,0,114.5,0,256s114.5,256,256,256s256-114.5,256-256S397.5,0,256,0z M324,255.1
                    h-44.7c0,70.7,0,158.3,0,158.3h-66.1c0,0,0-86.6,0-158.3h-31.7v-55.9h31.7v-36.3c0-26.1,12.1-66.1,66.1-66.1h48.4v54
                    c0,0-29.8,0-35.4,0c-5.6,0-14,2.8-14,14.9v32.6h50.3L324,255.1z`
                  },
                }
              }}
            />

            <GenericButton
              div={{
                id: 'github',
                className: 'w-full md:w-1/3 mr-6 pt-6 pl-4 border-t border-gray-400'
              }}
              button={{
                id: 'btn-facebook',
                className: 'appearance-none flex items-center justify-center w-full bg-gray-100 text-gray-700 shadow border border-gray-500 rounded-lg py-3 px-3 leading-tight hover:bg-gray-200 hover:text-gray-700 focus:outline-none',
                onClick: signInWithGithub,
                svg: {
                  className: 'h-6 w-6 fill-current text-gray-700',
                  viewBox: '0 0 512 512',
                  path: {
                    d: 'M 256 8 C 112 8 0 120 0 264 c 0 168 152 240 176 240 c 16 0 16 -8 16 -16 v -40 c -56 16 -80 -16 -88 -40 c 0 0 0 -8 -16 -24 c -8 -8 -40 -24 -8 -24 c 24 0 40 32 40 32 c 24 32 56 24 72 16 c 0 -16 16 -32 16 -32 c -64 -8 -112 -32 -112 -120 c 0 -32 8 -56 24 -72 c 0 0 -16 -32 0 -72 c 0 0 40 0 72 32 c 24 -16 104 -16 128 0 c 32 -32 72 -32 72 -32 c 16 56 0 72 0 72 c 16 16 24 40 24 72 c 0 88 -56 112 -112 120 c 8 8 16 24 16 48 v 64 c 0 8 0 16 16 16 c 24 0 176 -72 176 -240 C 512 120 400 8 256 8 Z'
                  },
                }
              }}
            />
          </div>
        </div>
        { !signed ? null : (
          toast.success('Welcome Back') && <Navigate to='/home' />
        ) }
      </div>
    </div>
  );
};
