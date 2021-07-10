import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { logOut } from '../auth/services/firebase'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../auth/providers/UserProvider'
import { useStyles } from '../components/styles'
import { Link, Route, Redirect } from 'react-router-dom'
import { Subject } from '../components/Subject'

export const Layout = () => {
  const classes = useStyles()

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
    <React.Fragment>
      <CssBaseline />
      <Route path='/Subject' component={Subject} />
      <AppBar
        position='static'
        color='default'
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            className={classes.toolbarTitle}
          >
            Distributed Systems
          </Typography>
          <nav>
            <Link to='/Dashboard/Subject'>
              <Button variant='button' color='black' className={classes.link}>
                Subjects{' '}
              </Button>
            </Link>
            <Link to='/Dashboard/Schedule'>
              <Button
                variant='button'
                color='textPrimary'
                className={classes.link}
              >
                Schedules
              </Button>
            </Link>
            <Link to='/Dashboard/Start'>
              <Button
                variant='button'
                color='textPrimary'
                className={classes.link}
              >
                Chat
              </Button>
            </Link>
          </nav>
          <Button
            color='primary'
            variant='outlined'
            className={classes.link}
            onClick={logOut}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
