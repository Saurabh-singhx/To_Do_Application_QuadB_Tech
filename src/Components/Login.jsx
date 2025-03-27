import React, { useState } from 'react';

function Login({ handlelogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandle = (e) => {
    e.preventDefault();
    handlelogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className=' h-screen w-screen flex items-center justify-center'>
      <div className='flex items-center justify-center flex-col m-10 h-80 w-96 bg-slate-800 rounded-xl shadow-xl p-8'>
        <h2 className='text-3xl text-orange-400 font-semibold mb-6'>Login</h2>
        <form onSubmit={submitHandle} className='flex items-center justify-center flex-col w-full'>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder='Email'
            className='w-full p-3 mb-4 border border-orange-400 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent placeholder:text-neutral-300 bg-transparent text-gray-50'
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder='Password'
            className='w-full p-3 mb-4 border border-orange-400 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent placeholder:text-slate-300 bg-transparent text-gray-50'
          />
          <button
            type="submit"
            className='w-full p-3 bg-orange-400 text-white rounded-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300'
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
