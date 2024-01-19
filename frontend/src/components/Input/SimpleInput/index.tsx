'use client';
import { forwardRef } from 'react';
import cx from 'clsx';
import style from './style.module.css';

export type Props = OverWrite<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    inputClassName?: string;
    lableClassName?: string;
    icon?: React.ReactNode;
  }
>;

const SimpleInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      lableClassName,
      defaultValue,
      title,
      type,
      onChange,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cx(style.balanceInput_wrapper, className)}>
        <input
          ref={ref}
          step="0.000000000000000001"
          className={cx(style.balanceInput, inputClassName)}
          autoComplete="off"
          defaultValue={defaultValue}
          onChange={onChange}
          type={type}
          id={props.name}
          //   autoFocus
          {...props}
        />
      </div>
    );
  }
);

export default SimpleInput;
