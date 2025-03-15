import { NavigateFunction } from 'react-router-dom'

// Define a global variable to store the navigate function
let navigate: NavigateFunction

// Provide a function to set the navigate function
export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav
}

// Provide a function to access the navigate function
export const getNavigate = () => {
  return navigate
}
