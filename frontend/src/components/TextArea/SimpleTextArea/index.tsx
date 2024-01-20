'use client';
import { forwardRef } from 'react';
import cx from 'clsx';
import style from './style.module.css';

export type Props = OverWrite<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  {
    title?: string;
    error?: boolean;
    textareaClass?: string;
    lableClass?: string;
    wrapperClass?: string;
    fill?: boolean;
  }
>;

const SimpleTextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      className,
      textareaClass,
      lableClass,
      wrapperClass,
      error,
      defaultValue,
      title,
      onChange,
      required,
      fill,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cx(wrapperClass, fill && 'w-full h-full')}>
        {title && (
          <label
            htmlFor={props.name}
            className={cx('mb-[4px] text-[16px] text-[#62677B]', lableClass)}
          >
            {title}
            {required && <span className="ml-8px text-[#E96170]">*</span>}
          </label>
        )}
        <div
          className={cx(
            style.balanceInput_wrapper,
            error && '!border-[#E96170] !ring-[#E96170]',
            fill && 'h-full w-full',
            className
          )}
        >
          <div
            className={cx(
              'flex justify-between items-center',
              fill && 'h-full w-full'
            )}
          >
            <textarea
              ref={ref}
              className={cx(
                style.balanceInput,
                textareaClass,
                error && '!text-[#E96170]',
                fill && 'h-full w-full'
              )}
              autoComplete="off"
              defaultValue={defaultValue}
              onChange={onChange}
              id={props.name}
              autoFocus
              {...props}
            />
            <div className={cx(style.balanceInput_errorBorder)} />
          </div>
        </div>
      </div>
    );
  }
);

export default SimpleTextArea;
