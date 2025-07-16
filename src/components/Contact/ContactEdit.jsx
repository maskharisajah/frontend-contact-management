import { useState } from "react";
import { Link, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDetail, contactUpdate } from "../../lib/api/ContactApi";
import { alertSuccess } from "../../lib/alert";
import { InputWithLabel } from "../Reusable/Input/Index";

function ContactEdit() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [token, _] = useLocalStorage("token", "");
  const { id } = useParams();

  async function fetchContact() {
    const response = await contactDetail(token, id);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setFirstName(responseBody.data.first_name);
      setLastName(responseBody.data.last_name);
      setEmail(responseBody.data.email);
      setPhone(responseBody.data.phone);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await contactUpdate(token, {
      id,
      first_name,
      last_name,
      email,
      phone,
    });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Contact updated successfully");
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    fetchContact().then(() => console.log("contact detail fetched success"));
  });

  return (
    <>
      <div>
        <div className='flex items-center mb-6'>
          <Link
            to='/dashboard/contacts'
            className='text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200'
          >
            <i className='fas fa-arrow-left mr-2' /> Back to Contacts
          </Link>
          <h1 className='text-2xl font-bold text-white flex items-center'>
            <i className='fas fa-user-edit text-blue-400 mr-3' /> Edit Contact
          </h1>
        </div>
        <div className='bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in'>
          <div className='p-8'>
            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
                <InputWithLabel
                  label='First Name'
                  type='text'
                  id='first_name'
                  name='first_name'
                  iconclass='fas fa-user-tag'
                  placeholder='Enter first name'
                  required
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <InputWithLabel
                  label='Last Name'
                  type='text'
                  id='last_name'
                  name='last_name'
                  iconclass='fas fa-user-tag'
                  placeholder='Enter last name'
                  required
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <InputWithLabel
                label='Email'
                type='email'
                id='email'
                name='email'
                iconclass='fas fa-envelope'
                placeholder='Enter email address'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className='mb-5' />

              <InputWithLabel
                label='Phone'
                type='tel'
                id='phone'
                name='phone'
                iconclass='fas fa-phone'
                placeholder='Enter phone number'
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className='mb-5' />

              <div className='flex justify-end space-x-4'>
                <Link
                  to='/dashboard/contacts'
                  className='px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md'
                >
                  <i className='fas fa-times mr-2' /> Cancel
                </Link>
                <button
                  type='submit'
                  className='px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center'
                >
                  <i className='fas fa-save mr-2' /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactEdit;
