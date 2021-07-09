import React from 'react'
import { connect } from 'react-redux'
import logo from '../resources/logo.png'
import SubmitButton from './components/SubmitButton'
import { useHistory } from 'react-router-dom'
import { registerNewUser } from '../utils/wssConnection/wssConnection'
import { setUsername } from '../store/actions/dashboardActions'

import './LoginPage.css'

const LoginPage = ({ saveUsername }) => {
  const history = useHistory()

  const handleSubmitButtonPressed = () => {
    registerNewUser(localStorage.getItem('userEmail'))
    console.log(localStorage.getItem('userEmail'))
    saveUsername(localStorage.getItem('userEmail'))
    history.push('/dashboard/chat')
  }

  return (
    <div className='login-page_container background_main_color'>
      <div className='login-page_login_box background_secondary_color'>
        <div className='login-page_logo_container'>
          <img className='login-page_logo_image' src={logo} alt='VideoTalker' />
        </div>
        <div className='login-page_title_container'>
          <h2>Get In Touch</h2>
        </div>
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  )
}

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: (username) => dispatch(setUsername(username)),
  }
}

export default connect(null, mapActionsToProps)(LoginPage)
