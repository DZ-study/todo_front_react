import { NavigateFunction } from 'react-router-dom'

// Define a global variable to store the navigate function
let navigate: NavigateFunction | null = null

// Provide a function to set the navigate function
export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav
}

// Provide a function to access the navigate function
export const navigateTo = (path: string) => {
  if (navigate) {
    navigate(path)
  } else {
    window.location.href = path
  }
}
