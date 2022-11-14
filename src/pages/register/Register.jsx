import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../../context/context';
import { auth, db } from '../../services/firebase';

import { 
  addDoc, setDoc, getDoc, getDocs,
  collection, onSnapshot, serverTimestamp 
} from 'firebase/firestore';

import {
  createUserWithEmailAndPassword, sendEmailVerification,
} from 'firebase/auth'; 
import { FormInput } from '../../components/formInput/FormInput';
import { GenericButton } from '../../components/btns/GenericButton';
import { HandleError } from '../../services/errors/Errors';

import debounce from 'lodash.debounce';


export const Register = () => {
  // const [ name, setName ] = useState('');
  // const [ username, setUsername ] = useState('');
  // const [ email, setEmail ] = useState('');
  // const [ password, setPassword ] = useState('');
  const { setUser, signed } = useContext(Context);
  // const [ isValid, setIsValid ] = useState(false);
  // const [ isLoading, setIsLoading ] = useState(false);

  // useEffect(() => {
  //   checkEmail(email);
  // }, [email]);

const handleSubmit = (e) => {
  e.preventDefault();
  const loginData = new FormData(e.target);
  const username = Object.fromEntries(loginData.entries()).username;
  const fullName = Object.fromEntries(loginData.entries()).fullName;
  const email = Object.fromEntries(loginData.entries()).email;
  const password = Object.fromEntries(loginData.entries()).password;
  const form = { username, fullName, email, password };
  signUpAccount(form);
};

  const signUpAccount = async (data) => {
    const { username, fullName, email, password } = data;
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (result) {
        const { user, 
          user: { accessToken: token, email: userEmail, displayName, photoURL, uid } 
        } = result;
        setUser(user);
        const usersRef = collection(db, 'users');
        await addDoc(usersRef, {
          email,
          name: fullName,
          username: username,
          avatarURL: null,
          createdAt: serverTimestamp(),
          status: 'pending',
        });
        localStorage.setItem('@Logged: token', token);
        localStorage.setItem('@Logged: user', JSON.stringify(user));
      }
    }
    catch(e) {
      console.log(e);
      Error(e);
    }    
  };

  // TO DO:
  // FAZER A PARTE DE USERNAME E FULL NAME
  // const onChangeUsername = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   const regex = /^[a-zA-Z0-9]+$/;

  //   setUsername(value);
  //   setIsLoading(true);
  //   setIsValid(false);

  //   if (regex.test(value)) {
  //     setUsername(value);
  //     setIsLoading(true);
  //     setIsValid(false);
  //   }
  // };

  // const onChangeName = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;

  //   if (regex.test(value)) {
  //     setName(value);
  //     setIsValid(false);
  //   }
  // };

  // const onChangeEmail = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //   setEmail(value);
  //   setIsLoading(true);
  //   setIsValid(false);

  //   if (regex.test(value)) {
  //     setEmail(value);
  //     setIsLoading(true);
  //     setIsValid(false);
  //   }
  // };

  // const checkEmail = useCallback(
  //   debounce(async () => {
  //     const ref = firestore.collection('users');
  //     const { exists } = await ref.get();
  //     // console.log('ref', ref);

  //     // console.log('Firestore read executed!');
  //     setIsValid(!exists);
  //     setIsLoading(false);
  //   }, 500),
  //   []
  // );

  return (
    <div className='login-page flex h-screen w-screen justify-center bg-gray-900 bg-gradient-to-r from-gray-900 to-gray-100'>
      <div className='login-landpage'>
        <div 
          className='text-center mt-24'
          id='title'
        >
          <div className='flex items-center justify-center'>
            <svg fill='none' viewBox='0 0 24 24' className='w-12 h-12 text-blue-500' stroke='currentColor'>
              <path strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'/>
            </svg>
          </div>

          <h2 className='text-4xl tracking-tight'>
            Register your account
          </h2>
        </div>

        <div
          id='register-card'
          className='max-w-xl rounded-lg shadow-md px-6 pt-12 pb-6 md:mx-0 mx-4 mt-16  bg-white'
        >
          <form
            id='register-form'
            className='w-full max-w-xl rounded-lg pr-6 pl-6'
            onSubmit={ handleSubmit }
          >
            <div
              id='form-and-register-btn'
              className='flex flex-wrap -mx-3'
            >
              <FormInput
                name='username'
                div={{
                  id: 'username-register-form',
                  className: 'w-full md:w-full px-3 mb-6',
                }}
                label= {{
                  className: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',
                  description: 'Username'
                }}
                input={{
                  id: 'username-input',
                  className: 'appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none',
                  type: 'text'
                }}
              />

              <FormInput
                name='fullName'
                div={{
                  id: 'fullName-register-form',
                  className: 'w-full md:w-full px-3 mb-6',
                }}
                label= {{
                  className: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',
                  description: 'Full Name'
                }}
                input={{
                  id: 'fullName-input',
                  className: 'appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none',
                  type: 'text'
                }}
              />

              <FormInput
                name='email'
                div={{
                  id: 'email-register-form',
                  className: 'w-full md:w-full px-3 mb-6',
                }}
                label= {{
                  className: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',
                  description: 'Email Adress'
                }}
                input={{
                  id: 'email-input',
                  className: 'appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none',
                  type: 'email',
                  required: true
                }}
              />

              <FormInput
                name='password'
                div={{
                  id: 'password-register-form',
                  className: 'w-full md:w-full px-3 mb-9',
                }}
                label= {{
                  className: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',
                  description: 'Password'
                }}
                input={{
                  id: 'password-input',
                  className: 'appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none',
                  type: 'password',
                  required: true
                }}
              />

              <GenericButton 
                div={{ 
                  id:'register-btn',
                  className: 'w-full md:w-full px-3'
                }}
                button={{ 
                  id: 'register-btn-input',
                  className: 'appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500',
                  description: 'Register'
                }}              
              />
            </div>
          </form>
        </div>
        { !signed ? null : <Navigate to='/home' /> }
      </div>
    </div>
  );
};