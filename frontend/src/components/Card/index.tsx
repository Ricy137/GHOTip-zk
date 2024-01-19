import { PropsWithChildren, ComponentProps } from 'react';
import cx from 'clsx';

export const WrapperCard: React.FC<
  PropsWithChildren &
    ComponentProps<'div'> & {
      color: 'purple' | 'green';
    }
> = ({ children, className, color, ...props }) => (
  <div
    className={cx(
      'py-[14px] px-[18px] rounded-b-[15px] rounded-tr-[15px]',
      color === 'purple' && 'bg-[#BCB4C8]',
      color === 'green' && 'bg-[#A4BC91]',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// export default Card;
