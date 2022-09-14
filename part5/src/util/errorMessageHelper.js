const displayErrorMessage = (error, setErrorFunction) => {
  setErrorFunction(error)
  setTimeout(() => {
    setErrorFunction(null)
  }, 5000)
}

export default {displayErrorMessage}