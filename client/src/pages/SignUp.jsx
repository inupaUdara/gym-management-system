import React, { useState } from 'react';
import { Alert, Button, Label, Spinner } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import Header from "../components/Header";
import gymImage from '../assets/gym11.jpg';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }

      setLoading(false);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div className='min-h-screen bg-[#1f1f1f]'>
      <Header />
      <div className="flex flex-col max-w-3xl p-3 mx-auto md:flex-row md:items-center">
        {/* left */}
        <div className='flex-col hidden w-full mr-10 md:w-8/12 lg:w-6/12 md:flex'>
          <img src={gymImage} alt="Gym" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* right */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <h4 className='text-xl font-bold' style={{ color: 'white' }}>Sign Up</h4>
            <p className='mt-5 text-sm center' style={{ color: '#707070' }}>
              Welcome to CJ Gym and Fitness Center
            </p>
            <div>
              <Label value='Username' style={{ color: 'white' }} />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Email' style={{ color: 'white' }} />
              <TextInput
                type='email'
                placeholder='name@yourmail.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Password' style={{ color: 'white' }} />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                onChange={handleChange}
              />
            </div>
          
            <button type="submit" className="text-white bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
           
           disabled={loading}
         >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </button>
            <OAuth />

          </form>
          <div className='flex gap-2 mt-5 text-sm text'>
          <span className="text-gray-300">Already have an account ?</span>
            <Link to='/sign-in' style={{ color: 'white' }}>
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
