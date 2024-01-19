
export const shortenAddress = ({
  address,
  preLen = 6,
  sufLen = 4,
}: {
  address: string
  preLen?: number
  sufLen?: number
}) => {
  return `${address.slice(0, preLen)}...${address.slice(-sufLen)}`
}

export const splitedAddress = (address: string) => {
  const splitedArray = address.split('-')
  return splitedArray[1]
}

