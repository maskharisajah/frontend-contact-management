import { Link } from "react-router";

function CardAddresses(props) {
  const {
    id,
    street,
    city,
    province,
    country,
    postal_code,
    handleDeleteAddress,
    AddressId,
  } = props;
  return (
    <>
      <div
        key={id}
        className='bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 card-hover'
      >
        <div className='flex items-center mb-3'>
          <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md'>
            <i className='fas fa-home text-white' />
          </div>
          <h4 className='text-lg font-semibold text-white'>Home Address</h4>
        </div>
        <div className='space-y-3 text-gray-300 ml-2 mb-4'>
          <p className='flex items-center'>
            <i className='fas fa-road text-gray-500 w-6' />
            <span className='font-medium w-24'>Street:</span>
            <span>{street}</span>
          </p>
          <p className='flex items-center'>
            <i className='fas fa-city text-gray-500 w-6' />
            <span className='font-medium w-24'>City:</span>
            <span>{city}</span>
          </p>
          <p className='flex items-center'>
            <i className='fas fa-map text-gray-500 w-6' />
            <span className='font-medium w-24'>Province:</span>
            <span>{province}</span>
          </p>
          <p className='flex items-center'>
            <i className='fas fa-flag text-gray-500 w-6' />
            <span className='font-medium w-24'>Country:</span>
            <span>{country}</span>
          </p>
          <p className='flex items-center'>
            <i className='fas fa-mailbox text-gray-500 w-6' />
            <span className='font-medium w-24'>Postal Code:</span>
            <span>{postal_code}</span>
          </p>
        </div>
        <div className='flex justify-end space-x-3'>
          <Link
            to={`/dashboard/contacts/${id}/addresses/${AddressId}/edit`}
            className='px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center'
          >
            <i className='fas fa-edit mr-2' /> Edit
          </Link>
          <button
            onClick={() => handleDeleteAddress(AddressId)}
            className='px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center'
          >
            <i className='fas fa-trash-alt mr-2' /> Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default CardAddresses;
