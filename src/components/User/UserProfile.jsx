import { useState } from "react";
import {
  userDetail,
  userUpdatePassword,
  userUpdateProfile,
} from "../../lib/api/UserApi";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert";
import { InputWithLabel } from "../Reusable/Input/Index";
import CardProfile from "../Reusable/Card/CardProfile";

function UserProfile() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, _] = useLocalStorage("token", "");

  async function fetchUserDetail() {
    const response = await userDetail(token);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setName(responseBody.data.name);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function handleSubmitProfile(e) {
    e.preventDefault();

    const response = await userUpdateProfile(token, { name });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Profile updated successfully");
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function handleSubmitPassword(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      await alertError("Passwords don't match");
      return;
    }

    const response = await userUpdatePassword(token, { password });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setPassword("");
      setConfirmPassword("");
      await alertSuccess("Password updated successfully");
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    fetchUserDetail().then(() => console.log("fetch user detail success"));
  });

  return (
    <>
      {/* Main content */}
      <main className='container mx-auto px-4 py-8 flex-grow'>
        <div className='flex items-center mb-6'>
          <i className='fas fa-user-cog text-blue-400 text-2xl mr-3' />
          <h1 className='text-2xl font-bold text-white'>My Profile</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Form 1: Edit Name */}
          <CardProfile>
            <form onSubmit={handleSubmitProfile}>
              <div className='mb-5'>
                <InputWithLabel
                  label='Full Name'
                  type='text'
                  id='name'
                  name='name'
                  iconclass='fas fa-user'
                  placeholder='Enter your full name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='mt-6'>
                <button
                  type='submit'
                  className='w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center'
                >
                  <i className='fas fa-save mr-2' /> Update Profile
                </button>
              </div>
            </form>
          </CardProfile>

          {/* Form 2: Edit Password */}
          <CardProfile>
            <form onSubmit={handleSubmitPassword}>
              <div className='mb-5'>
                <InputWithLabel
                  label='New Password'
                  type='password'
                  id='new_password'
                  name='new_password'
                  iconclass='fas fa-lock fas '
                  placeholder='Enter your new password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='mb-5'>
                <InputWithLabel
                  label='Confirm Password'
                  type='password'
                  id='confirm_password'
                  name='confirm_password'
                  iconclass=' fas fa-check-double'
                  placeholder='Confirm your new password'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className='mt-6'>
                <button
                  type='submit'
                  className='w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center'
                >
                  <i className='fas fa-key mr-2' /> Update Password
                </button>
              </div>
            </form>
          </CardProfile>
        </div>
      </main>
    </>
  );
}

export default UserProfile;
