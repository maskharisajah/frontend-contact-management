function CardContactCreate(props) {
  const { children } = props;
  return (
    <>
      <div className='bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in'>
        <div className='p-8'>{children}</div>
      </div>
    </>
  );
}

export default CardContactCreate;
