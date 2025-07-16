import { Link, useParams } from "react-router";
import { contactDetail } from "../../lib/api/ContactApi";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";
import { useEffectOnce, useLocalStorage } from "react-use";
import { useState } from "react";
import { addressDelete, addressList } from "../../lib/api/AdressApi";
import CardContactDetail from "../Reusable/Card/CardContactDetail";
import CardAddresses from "../Reusable/Card/CardAddresses";

function ContactDetail() {
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [token, _] = useLocalStorage("token", "");
  const [addresses, setAddresses] = useState([]);

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

  async function fetchAddresses() {
    const response = await addressList(token, id);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setAddresses(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function handleDeleteAddress(addressId) {
    if (
      !(await alertConfirm("Are you sure you want to delete this address?"))
    ) {
      return;
    } else {
      const response = await addressDelete(token, id, addressId);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.status === 200) {
        await alertSuccess("Address deleted successfully");
        await fetchAddresses();
      } else {
        await alertError(responseBody.errors);
      }
    }
  }

  useEffectOnce(() => {
    fetchContact().then(() =>
      console.log("Contact  detail fetched successfully")
    );
    fetchAddresses().then(() => console.log("Addresses fetched successfully"));
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
            <i className='fas fa-id-card text-blue-400 mr-3' /> Contact Details
          </h1>
        </div>
        <CardContactDetail
          id={contact.id}
          first_name={contact.first_name}
          last_name={contact.last_name}
          email={contact.email}
          phone={contact.phone}
        >
          {addresses.map(
            (address) => (
              console.log("address", address),
              (
                <CardAddresses
                  key={address.id}
                  id={id}
                  AddressId={address.id}
                  street={address.street}
                  city={address.city}
                  province={address.province}
                  country={address.country}
                  postal_code={address.postal_code}
                  handleDeleteAddress={handleDeleteAddress}
                />
              )
            )
          )}
        </CardContactDetail>
      </div>
    </>
  );
}

export default ContactDetail;
