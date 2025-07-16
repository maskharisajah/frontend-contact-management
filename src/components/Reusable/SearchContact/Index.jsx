import { useEffectOnce } from "react-use";

function SearchContact(props) {
  const { children } = props;

  useEffectOnce(() => {
    const toggleButton = document.getElementById("toggleSearchForm");
    const searchFormContent = document.getElementById("searchFormContent");
    const toggleIcon = document.getElementById("toggleSearchIcon");

    // Add transition for smooth animation
    searchFormContent.style.transition =
      "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
    searchFormContent.style.overflow = "hidden";
    searchFormContent.style.maxHeight = "0px";
    searchFormContent.style.opacity = "0";
    searchFormContent.style.marginTop = "0";

    function toggleSearchForm() {
      if (searchFormContent.style.maxHeight !== "0px") {
        // Hide the form
        searchFormContent.style.maxHeight = "0px";
        searchFormContent.style.opacity = "0";
        searchFormContent.style.marginTop = "0";
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
      } else {
        // Show the form
        searchFormContent.style.maxHeight =
          searchFormContent.scrollHeight + "px";
        searchFormContent.style.opacity = "1";
        searchFormContent.style.marginTop = "1rem";
        toggleIcon.classList.remove("fa-chevron-down");
        toggleIcon.classList.add("fa-chevron-up");
      }
    }

    toggleButton.addEventListener("click", toggleSearchForm);

    return () => {
      toggleButton.removeEventListener("click", toggleSearchForm);
    };
  });

  return (
    <>
      <div className='bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <i className='fas fa-search text-blue-400 mr-3' />
            <h2 className='text-xl font-semibold text-white'>
              Search Contacts
            </h2>
          </div>
          <button
            type='button'
            id='toggleSearchForm'
            className='text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200'
          >
            <i className='fas fa-chevron-down text-lg' id='toggleSearchIcon' />
          </button>
        </div>
        <div id='searchFormContent' className='mt-4'>
          {children}
        </div>
      </div>
    </>
  );
}

export default SearchContact;
