function CardAddressEdit(props) {
  const { first_name, last_name, email, phone, children } = props;
  return (
    <div className='bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in'>
      <div className='p-8'>
        {/* Contact Information */}
        <div className='mb-6 pb-6 border-b border-gray-700'>
          <div className='flex items-center'>
            <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md'>
              <i className='fas fa-user text-white' />
            </div>
            <div>
              <h2 className='text-xl font-semibold text-white'>
                {first_name} {last_name}
              </h2>
              <p className='text-gray-300 text-sm'>
                {email} • {phone}
              </p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default CardAddressEdit;
