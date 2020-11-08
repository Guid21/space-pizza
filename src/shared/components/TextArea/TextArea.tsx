import React, { FC } from 'react';
import cn from 'classnames';

interface ITextArea {
  value?: string | number;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isError?: boolean;
  textError?: string;
  title?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  readOnly?: boolean;
  autoComplete?: string;
  required?: boolean;
  my2?: boolean;
}

const TextArea: FC<ITextArea> = ({
  value,
  onChange = () => {},
  isError = false,
  textError,
  title,
  placeholder,
  id,
  name,
  onBlur,
  readOnly = false,
  autoComplete = 'on',
  required = false,
}) => {
  return (
    <div className="app-input md:col-span-2 lg:col-span-3">
      <label
        htmlFor={id}
        className="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker"
      >
        {title} {required && <sup className="text-red-700">*</sup>}
      </label>
      <textarea
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

export default TextArea;
