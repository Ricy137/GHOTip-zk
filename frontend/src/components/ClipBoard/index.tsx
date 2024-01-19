'use client';
import { type ComponentProps, useState, useCallback } from 'react';
import useClipboard from 'react-use-clipboard';
import { CopyIcon } from '@/components/Icons';
import ToolTip from '@/components/Tooltip';

interface ClipBoardProps {
  content: string;
}

const ClipBoard: React.FC<ComponentProps<'button'> & ClipBoardProps> = ({
  content,
}) => {
  const [isCopied, copy] = useClipboard(content, { successDuration: 1000 });
  // const [isHovering, setIsHovering] = useState(false);
  // const handleMoseEnter = useCallback(() => {
  //   setIsHovering(true);
  // }, []);
  // const handleMouseLeave = useCallback(() => {
  //   setIsHovering(false);
  // }, []);

  return (
    <ToolTip text={'copied'} trigger="hover" controledOpen={isCopied}>
      <CopyIcon className="w-[22px] h-[22px] cursor-pointer" onClick={copy} />
    </ToolTip>
  );
};

export default ClipBoard;
