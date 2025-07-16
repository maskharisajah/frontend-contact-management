import { useState } from "react";
import { alertError, alertSuccess } from "../../lib/alert.js";
import { userRegister } from "../../lib/api/UserApi.js";
import { Link, useNavigate } from "react-router";
import { InputWithLabel } from "../Reusable/Input/Index.jsx";

export default function UserRegister() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      await alertError("Passwords don't match");
      return;
    }

    const response = await userRegister({
      username: username,
      password: password,
      name: name,
    });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("User created successfully");
      await navigate({
        pathname: "/login",
      });
    } else {
      await alertError(responseBody.errors);
    }
  }

  return (
    <>
      <div className='animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md'>
        <div className='text-center mb-8'>
          <div className='inline-block p-3 bg-gradient rounded-full mb-4'>
            <i className='fas fa-user-plus text-3xl text-white'></i>
          </div>
          <h1 className='text-3xl font-bold text-white'>Contact Management</h1>
          <p className='text-gray-300 mt-2'>Create a new account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <InputWithLabel
            label='Username'
            type='text'
            id='username'
            name='username'
            iconclass='fas fa-user'
            placeholder='Choose a username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className='mb-4' />

          <InputWithLabel
            label='Full Name'
            type='text'
            id='name'
            name='name'
            iconclass='fa fa-id-card'
            placeholder='Enter your full name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className='mb-4' />

          <InputWithLabel
            label='Password'
            type='password'
            id='password'
            name='password'
            iconclass='fas fa-lock'
            placeholder='Create a password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='mb-4' />

          <InputWithLabel
            label='Confirm Password'
            type='password'
            id='confirm_password'
            name='confirm_password'
            iconclass='fas fa-check-double'
            placeholder='Confirm your password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className='mb-6' />

          <div className='mb-6'>
            <button
              type='submit'
              className='w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5'
            >
              <i className='fas fa-user-plus mr-2'></i> Register
            </button>
          </div>

          <div className='text-center text-sm text-gray-400'>
            Already have an account?
            <Link
              to='/login'
              className='text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200'
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
