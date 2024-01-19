'use client'
import React, { useCallback } from 'react'
import cx from 'clsx'
import { uniqueId } from 'lodash-es'
import { atom, useAtom, useAtomValue } from 'jotai'
// import { CheckedIcon, FailedIcon } from '@/components/Icons'

interface Toast {
  content: string | React.ReactNode
  type: 'success' | 'warning' | 'failed'
  id: string
  key?: string
}

const toastAtom = atom<Toast[]>([])

export const useShowToast = () => {
  const [toasts, setToasts] = useAtom(toastAtom)

  const showToast = useCallback(
    (param: Omit<Toast, 'id'> & { key?: string; duration?: number }) => {
      if (
        param.key &&
        toasts.find((item: Toast) => item.key && item.key === param.key)
      )
        return
      let newToasts = toasts ? [...toasts] : []
      const id = uniqueId('toast_')
      newToasts.push({ ...param, id })
      setToasts(newToasts)
      setTimeout(() => {
        setToasts((toastsAfter) => {
          let newToastsAfter = toastsAfter ? [...toastsAfter] : []
          newToastsAfter = newToastsAfter.filter((item) => item.id !== id)
          return newToastsAfter
        })
      }, param.duration || 3000)
    },
    [toasts]
  )

  return showToast
}

export const ToastRender: React.FC = () => {
  const toasts = useAtomValue(toastAtom)

  return (
    <div className="fixed left-0 top-[5%] right-0 flex flex-col justify-center items-center gap-[12px] z-40">
      {toasts.map(({ content, type, id }) => (
        <div
          key={id}
          className={cx(
            'px-[24px] h-[48px] flex flex-row sm:justify-between items-center gap-x-[16px] w-[90%] sm:w-fit bg-[#ffffff] rounded-[60px] z-[40] task-card-shadow',
            type === 'success' && 'text-[#1E8E3E]',
            type === 'warning' || (type === 'failed' && 'text-[#D93026]')
          )}
        >
          {/* {type === 'success' ? (
            <CheckedIcon className="w-[14px] h-[40px]" />
          ) : (
            <FailedIcon className="w-[14px] h-[40px]" />
          )} */}
          <div className="sm:max-w-[1000px] truncate">{content}</div>
        </div>
      ))}
    </div>
  )
}
