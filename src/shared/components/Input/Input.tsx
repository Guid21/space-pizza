import React, { FC } from 'react';
import cn from 'classnames';

interface IInput {
  value?: string | number;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  textError?: string;
  title?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  type?: 'text' | 'number' | 'password';
  readOnly?: boolean;
  autoComplete?: string;
  required?: boolean;
  my2?: boolean;
}

const Input: FC<IInput> = ({
  value,
  onChange = () => {},
  isError = false,
  textError,
  title,
  placeholder,
  id,
  name,
  onBlur,
  type = 'text',
  readOnly = false,
  autoComplete = 'on',
  required = false,
  my2 = true,
}) => {
  return (
    <div className={cn({ 'my-2': my2 }, 'w-full')}>
      <label
        htmlFor={id}
        className="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        {title} {required && <sup className="text-red-700">*</sup>}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        onBlur={onBlur}
        className={cn(
          { 'border-red-600': isError || textError },
          'block w-full my-2 px-3 py-2 transition duration-150 border rounded-lg appearance-none bg-grey-lighter text-grey-darker focus:border-orange-500 focus:outline-none'
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        autoComplete={autoComplete}
      />
      <div className="mt-3 text-xs italic text-red-600">
        <p>{textError}</p>
      </div>
    </div>
  );
};

export default Input;
