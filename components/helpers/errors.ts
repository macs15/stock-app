import axios from 'axios'

export const getErrorMsg = (error: unknown) => {
  console.log('[SERVICE-ERROR]')

  if (!axios.isAxiosError(error)) {
    console.log(error)
    return 'Oops, it seems that something bad happened'
  }

  if (error.response) {
    console.log({
      url: error.response?.config?.url,
      status: error.response?.status,
      errorMessage: error.message,
      apiErrorMessage: error.response?.data?.errors
    })

    return error.message
  }
  
  console.log(error)
}
