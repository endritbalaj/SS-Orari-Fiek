import './Dashboard.css'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../auth/providers/UserProvider'
import { Redirect } from 'react-router-dom'
import { logOut } from '../auth/services/firebase'

export const Dashboard = () => {
  const user = useContext(UserContext)
  const [redirect, setredirect] = useState(null)

  useEffect(() => {
    if (!user) {
      setredirect('/')
    }
  }, [user])

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="dashboard">
      {user !== null ? (
        <h1 className="dashboard-text">Welcome {user.displayName}</h1>
      ) : null}
      <button className="logout-button" onClick={logOut}>
        <img
          src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
          alt="google icon"
        />
        <span> Log out</span>
      </button>
    </div>
  )
}
