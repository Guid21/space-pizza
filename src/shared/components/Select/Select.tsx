import React, { FC } from 'react';
import cn from 'classnames';

interface ISelect {
  value?: string | number;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
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
  noWrap?: boolean;
  className?: string;
}

const Select: FC<ISelect> = ({
  value,
  onChange = () => {},
  isError = false,
  textError,
  title,
  placeholder,
  id,
  name,
  onBlur,
  autoComplete = 'on',
  required = false,
  children,
  noWrap = false,
  className,
}) => {
  const select = (
    <select
      name={name}
      id={id}
      onBlur={onBlur}
      className={cn(
        className,
        { 'border-red-600': isError || textError },
        'focus:border-orange-500 focus:outline-none'
      )}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
    >
      {children}
    </select>
  );
  if (noWrap) return select;
  return (
    <div className="app-input">
      <label
        htmlFor={id}
        className="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        {title} {required && <sup className="text-red-700">*</sup>}
      </label>
      {select}
      <div className="mt-3 text-xs italic text-red-600">
        <p>{textError}</p>
      </div>
    </div>
  );
};

export default Select;
