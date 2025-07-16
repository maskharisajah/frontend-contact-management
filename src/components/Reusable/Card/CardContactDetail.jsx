import { Link } from "react-router";

function CardContactDetail(props) {
  const { first_name, last_name, email, phone, children, id } = props;
  return (
    <div className='bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in'>
      <div className='p-8'>
        {/* Contact Header */}
        <div className='mb-8 text-center'>
          <div className='w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg'>
            <i className='fas fa-user text-3xl text-white' />
          </div>
          <h2 className='text-2xl font-bold text-white mb-2'>
            {first_name} {last_name}
          </h2>
          <div className='w-24 h-1 bg-gradient mx-auto rounded-full' />
        </div>
        {/* Contact Information */}
        <div className='space-y-5 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70'>
              <div className='flex items-center mb-2'>
                <i className='fas fa-user-tag text-blue-400 mr-2' />
                <h3 className='text-gray-300 text-sm font-medium'>
                  First Name
                </h3>
              </div>
              <p className='text-white text-lg ml-6'>{first_name}</p>
            </div>
            <div className='bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70'>
              <div className='flex items-center mb-2'>
                <i className='fas fa-user-tag text-blue-400 mr-2' />
                <h3 className='text-gray-300 text-sm font-medium'>Last Name</h3>
              </div>
              <p className='text-white text-lg ml-6'>{last_name}</p>
            </div>
          </div>
          <div className='bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70'>
            <div className='flex items-center mb-2'>
              <i className='fas fa-envelope text-blue-400 mr-2' />
              <h3 className='text-gray-300 text-sm font-medium'>Email</h3>
            </div>
            <p className='text-white text-lg ml-6'>{email}</p>
          </div>
          <div className='bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70'>
            <div className='flex items-center mb-2'>
              <i className='fas fa-phone text-blue-400 mr-2' />
              <h3 className='text-gray-300 text-sm font-medium'>Phone</h3>
            </div>
            <p className='text-white text-lg ml-6'>{phone}</p>
          </div>
        </div>
        {/* Addresses Section */}
        <div className='mb-8'>
          <div className='flex items-center mb-5'>
            <i className='fas fa-map-marker-alt text-blue-400 mr-3' />
            <h3 className='text-xl font-semibold text-white'>Addresses</h3>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {/* Add Address Card */}
            <div className='bg-gray-700 bg-opacity-50 p-5 rounded-lg border-2 border-dashed border-gray-600 shadow-md card-hover'>
              <Link
                to={`/dashboard/contacts/${id}/addresses/create`}
                className='block h-full'
              >
                <div className='flex flex-col items-center justify-center h-full text-center py-4'>
                  <div className='w-16 h-16 bg-gradient rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110'>
                    <i className='fas fa-plus text-2xl text-white' />
                  </div>
                  <h4 className='text-lg font-semibold text-white'>
                    Add Address
                  </h4>
                </div>
              </Link>
            </div>
            {/* Address Card */}
            {children}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end space-x-4'>
          <Link
            to='/dashboard/contacts'
            className='px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md'
          >
            <i className='fas fa-arrow-left mr-2' /> Back
          </Link>
          <Link
            to={`/dashboard/contacts/${id}/edit`}
            className='px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center'
          >
            <i className='fas fa-user-edit mr-2' /> Edit Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardContactDetail;
