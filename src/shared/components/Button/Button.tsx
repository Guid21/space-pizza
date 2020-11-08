import React, { FC } from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

interface IButton {
  type?: 'default' | 'primary' | 'link';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  className?: string;
  black?: boolean;
  refButton?:
    | string
    | ((instance: HTMLButtonElement | null) => void)
    | React.RefObject<HTMLButtonElement>;
  style?: React.CSSProperties;
  wFull?: boolean;
  px3?: boolean;
  py2?: boolean;
  htmlType?: 'submit' | 'button';
  boold?: boolean;
}

const Button: FC<IButton> = ({
  type = 'default',
  children,
  onClick,
  className,
  refButton,
  disabled = false,
  black = false,
  boold = false,
  wFull = true,
  px3 = true,
  py2 = true,
  style,
  htmlType = 'button',
}) => {
  switch (type) {
    case 'primary':
      return (
        <button
          disabled={disabled}
          onClick={onClick}
          type={htmlType}
          ref={refButton}
          className={cn(
            'flex flex-row items-center justify-center w-full px-3 py-2 text-sm text-center text-white bg-orange-500 border-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:shadow-outline',
            { 'font-bold': boold },
            className,
            styles.Button
          )}
        >
          {children}
        </button>
      );
    case 'link':
      return (
        <button
          disabled={disabled}
          onClick={onClick}
          type={htmlType}
          ref={refButton}
          className={cn(
            'tracking-tighter text-black border-b-2 border-orange-200 cursor-pointer hover:border-orange-400',
            className,
            styles.Button
          )}
        >
          {children}
        </button>
      );
    default:
      return (
        <button
          disabled={disabled}
          onClick={onClick}
          ref={refButton}
          type={htmlType}
          style={style}
          className={cn(
            { 'border-gray-600 text-black': black },
            { 'text-orange-500 border-orange-500': !black },
            { 'w-full': wFull },
            { 'px-3': px3 },
            { 'py-2': py2 },
            { 'font-bold': !boold },
            'text-sm  text-center  border  rounded-lg hover:text-orange-600 hover:border-orange-600 focus:outline-none focus:shadow-outline',
            className,
            styles.Button
          )}
        >
          {children}
        </button>
      );
  }
};

export default Button;
