function CardProfile(props) {
  const { children } = props;
  return (
    <>
      <div className='bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in'>
        <div className='p-6'>
          <div className='flex items-center mb-4'>
            <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md'>
              <i className='fas fa-user-edit text-white' />
            </div>
            <h2 className='text-xl font-semibold text-white'>Edit Profile</h2>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default CardProfile;
