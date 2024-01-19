'use client'
import { forwardRef } from 'react'
import cx from 'clsx'
import style from './style.module.css'

export type Props = OverWrite<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    title?: string
    error?: boolean
    inputClassName?: string
    lableClassName?: string
    icon?: React.ReactNode
  }
>

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      inputClassName,
      lableClassName,
      error,
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
      <>
        {title && (
          <label
            htmlFor={props.name}
            className={cx(
              'mb-[4px] text-[14px] text-[#62677B]',
              lableClassName
            )}
          >
            {title}
          </label>
        )}
        <div
          className={cx(
            style.balanceInput_wrapper,
            error && '!border-[#E96170] !ring-[#E96170]',
            className
          )}
        >
          <div className="flex justify-between items-center">
            <input
              ref={ref}
              step="0.000000000000000001"
              className={cx(
                style.balanceInput,
                inputClassName,
                error && '!text-[#E96170]'
              )}
              autoComplete="off"
              defaultValue={defaultValue}
              onChange={onChange}
              type={type}
              id={props.name}
              autoFocus
              {...props}
            />
            {icon}
            <div className={cx(style.balanceInput_errorBorder)} />
          </div>
        </div>
      </>
    )
  }
)

export default Input
