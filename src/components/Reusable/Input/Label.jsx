function Label(props) {
  const { htmlFor, children } = props;
  return (
    <label
      htmlFor={htmlFor}
      className='block text-gray-300 text-sm font-medium mb-2'
    >
      {children}
    </label>
  );
}

export default Label;
