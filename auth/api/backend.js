import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const sendData = (fullName, email) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  const role = checkRole(email)
  const id = uuidv4()

  const userObj = {
    id,
    fullName,
    role,
    email,
  }
  
  const url = `${process.env.REACT_APP_WEBAPI}/User/Add`

  axios.post(url, userObj, headers).then((res) => {
    console.log(res)
    localStorage.setItem('id', res.data)
  })
  localStorage.setItem('role', role)
}

const checkRole = (email) => {
  // eslint-disable-next-line
  const [_, domain] = email.split('@')

  if (domain === 'student.uni-pr.edu') return 2
  return 1
}
