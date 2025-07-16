import Input from "./Input";
import Label from "./Label";

function InputWithLabel(props) {
  const { label, id, name, type, placeholder, value, onChange, iconclass } =
    props;
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <i className={`${iconclass} text-gray-500`} />
        </div>
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          iconclass={iconclass}
        />
      </div>
    </div>
  );
}

export { InputWithLabel };
