// import Error from "next/error"
export const errorMessage = (error: Error & { code?: string }) => {
  if (error.code === 'ACTION_REJECTED') {
    return 'User rejected the transaction'
  } else if (error.code === 'CALL_EXCEPTION') {
    return 'Transaction reverted, you may entered wrong data or not have rights'
  } else if (error.code === 'INSUFFICIENT_FUNDS') {
    return 'Insufficient funds'
  }
  return error.message
}
