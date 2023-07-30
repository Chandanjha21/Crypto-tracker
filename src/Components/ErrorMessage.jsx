import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <Alert status={'error'} >
      <AlertIcon  />
      {message}
    </Alert>
  )
}

export default ErrorMessage