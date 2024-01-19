import React, { forwardRef, type PropsWithChildren } from 'react';
import Spin from '../Spin';
import cx from 'clsx';
import './index.css';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'white' | 'amber' | 'purple' | 'green';
  variant?: 'contained' | 'outlined' | 'text';
  fullWidth?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  (
    {
      children,
      className,
      disabled = false,
      fullWidth = false,
      loading = false,
      variant = 'contained',
      color = 'primary',
      size = 'medium',
      ...props
    },
    _forwardRef
  ) => {
    return (
      <button
        className={cx(
          `fui-button--${variant} fui-button--${color} fui-button--${size}`,
          'flex flex-row justify-center items-center whitespace-nowrap cursor-pointer rounded-[15px]',
          (loading || disabled) &&
            'bg-gray-400 opacity-30 pointer-events-none cursor-not-allowed',
          fullWidth ? 'w-full' : 'w-fit',
          className
        )}
        {...props}
      >
        {/* {loading && <Spin className="mr-[8px] w-[18px] h-[18px]" />} */}
        {children}
      </button>
    );
  }
);

export default Button;
