import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { contactDelete, contactList } from "../../lib/api/ContactApi";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";
import { Link } from "react-router";
import Pagination from "../Reusable/Pagination/Index";

import SearchContact from "../Reusable/SearchContact/Index";
import { InputWithLabel } from "../Reusable/Input/Index";
import CardContacts from "../Reusable/Card/CardContacts";

function ContactList() {
  const [token, _] = useLocalStorage("token", "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [reload, setReload] = useState(false);

  async function handleSearchContact(e) {
    e.preventDefault();
    setPage(1);
    setReload(!reload);
  }

  async function handlePageChange(page) {
    setPage(page);
    setReload(!reload);
  }

  async function fetchContacts() {
    const response = await contactList(token, { name, email, phone, page });
    const responseBody = await response.json();
    console.log("response body =", responseBody);

    if (response.status === 200) {
      setContacts(responseBody.data);
      setTotalPage(responseBody.paging.total_page);
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function handleContactDelete(id) {
    if (
      !(await alertConfirm("Are you sure you want to delete this contact?"))
    ) {
      return;
    }

    const response = await contactDelete(token, id);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Contact deleted successfully");
      setReload(!reload);
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffect(() => {
    fetchContacts().then(() => console.log("contact fetched"));
  }, [reload]);

  return (
    <>
      <div>
        <div className='flex items-center mb-6'>
          <i className='fas fa-users text-blue-400 text-2xl mr-3' />
          <h1 className='text-2xl font-bold text-white'>My Contacts</h1>
        </div>
        {/* Search form */}
        <SearchContact>
          <form onSubmit={handleSearchContact}>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              <InputWithLabel
                label='Name'
                id='search_name'
                name='search_name'
                type='text'
                placeholder='Search by name'
                iconclass='fas fa-user'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <InputWithLabel
                label='Email'
                id='search_email'
                name='search_email'
                type='text'
                placeholder='Search by email'
                iconclass='fas fa-envelope'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputWithLabel
                label='Phone'
                id='search_phone'
                name='search_phone'
                type='text'
                placeholder='Search by phone'
                iconclass='fas fa-phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className='mt-5 text-right'>
              <button
                type='submit'
                className='px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5'
              >
                <i className='fas fa-search mr-2' /> Search
              </button>
            </div>
          </form>
        </SearchContact>

        {/* Contact cards grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Create New Contact Card */}
          <div className='bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in'>
            <Link to='/dashboard/contacts/create' className='block p-6 h-full'>
              <div className='flex flex-col items-center justify-center h-full text-center'>
                <div className='w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110'>
                  <i className='fas fa-user-plus text-3xl text-white' />
                </div>
                <h2 className='text-xl font-semibold text-white mb-3'>
                  Create New Contact
                </h2>
                <p className='text-gray-300'>Add a new contact to your list</p>
              </div>
            </Link>
          </div>

          {/* Contact Card */}
          {contacts.map((contact) => (
            <CardContacts
              key={contact.id}
              id={contact.id}
              first_name={contact.first_name}
              last_name={contact.last_name}
              email={contact.email}
              phone={contact.phone}
              handleContactDelete={handleContactDelete}
            />
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPage={totalPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default ContactList;
