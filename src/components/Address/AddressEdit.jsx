import { useState } from "react";
import { Link, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDetail } from "../../lib/api/ContactApi";
import { addressDetail, addressUpdate } from "../../lib/api/AdressApi";
import { alertError, alertSuccess } from "../../lib/alert";
import { InputWithLabel } from "../Reusable/Input/Index";
import CardAddressEdit from "../Reusable/Card/CardAddressEdit";

function AddressEdit() {
  const { id, addressId } = useParams();
  const [contact, setContact] = useState({});
  const [token, _] = useLocalStorage("token", "");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await addressUpdate(token, id, {
      addressId,
      street,
      city,
      province,
      country,
      postal_code,
    });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Address updated successfully");
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function fetchContact() {
    const response = await contactDetail(token, id);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setContact(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function fetchAddress() {
    const response = await addressDetail(token, id, addressId);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setStreet(responseBody.data.street);
      setCity(responseBody.data.city);
      setProvince(responseBody.data.province);
      setCountry(responseBody.data.country);
      setPostalCode(responseBody.data.postal_code);
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    fetchContact().then(() =>
      console.log("Contact  detail fetched successfully")
    );

    fetchAddress().then(() =>
      console.log("Address detail fetched successfully")
    );
  });

  return (
    <>
      <div>
        <div className='flex items-center mb-6'>
          <Link
            to={`/dashboard/contacts/${id}`}
            className='text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200'
          >
            <i className='fas fa-arrow-left mr-2' /> Back to Contact Details
          </Link>
          <h1 className='text-2xl font-bold text-white flex items-center'>
            <i className='fas fa-map-marker-alt text-blue-400 mr-3' /> Edit
            Address
          </h1>
        </div>
        <div className='bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in'>
          <CardAddressEdit
            first_name={contact.first_name}
            last_name={contact.last_name}
            email={contact.email}
            phone={contact.phone}
          >
            <form onSubmit={handleSubmit}>
              <div className='mb-5'>
                <InputWithLabel
                  label='Street'
                  type='text'
                  id='street'
                  name='street'
                  iconclass='fas fa-road'
                  placeholder='Enter street address'
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
                <InputWithLabel
                  label='City'
                  type='text'
                  id='city'
                  name='city'
                  iconclass='fas fa-city'
                  placeholder='Enter city'
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <InputWithLabel
                  label='Province / State'
                  type='text'
                  id='province'
                  name='province'
                  iconclass='fas fa-map'
                  placeholder='Enter province or state'
                  required
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-6'>
                <InputWithLabel
                  label='Country'
                  type='text'
                  id='country'
                  name='country'
                  iconclass='fas fa-flag'
                  placeholder='Enter country'
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <InputWithLabel
                  label='Postal Code'
                  type='text'
                  id='postal_code'
                  name='postal_code'
                  iconclass='fas fa-mail-bulk'
                  placeholder='Enter postal code'
                  required
                  value={postal_code}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className='flex justify-end space-x-4'>
                <Link
                  to={`/dashboard/contacts/${id}`}
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
          </CardAddressEdit>
        </div>
      </div>
    </>
  );
}

export default AddressEdit;
