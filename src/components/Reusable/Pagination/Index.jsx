export default function Pagination(props) {
  const { currentPage, totalPage, handlePageChange } = props;
  function getPages() {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  return (
    <div className='mt-10 flex justify-center'>
      <nav className='flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in'>
        {currentPage > 1 && (
          <a
            href='#'
            onClick={() => handlePageChange(currentPage - 1)}
            className='px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center'
          >
            <i className='fas fa-chevron-left mr-2' /> Previous
          </a>
        )}

        {getPages().map((value) => (
          <a
            href='#'
            key={value}
            onClick={() => handlePageChange(value)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              value === currentPage
                ? " bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800  font-medium shadow-md"
                : " bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 "
            }`}
          >
            {value}
          </a>
        ))}

        {currentPage < totalPage && (
          <a
            href='#'
            onClick={() => handlePageChange(currentPage + 1)}
            className='px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center'
          >
            Next <i className='fas fa-chevron-right ml-2' />
          </a>
        )}
      </nav>
    </div>
  );
}
