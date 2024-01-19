//TODO:Abstract
export const shortenStr = ({
  str,
  preLen = 6,
  sufLen = 4,
}: {
  str: string;
  preLen?: number;
  sufLen?: number;
}) => {
  return `${str.slice(0, preLen)}...${str.slice(-sufLen)}`;
};
