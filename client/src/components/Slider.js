import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  upper: {
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    marginTop: '7%',
    width: 275,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}))

export const InputYear = () => {
  const classes = useStyles()
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    return <Redirect to="/Dashboard" />
  }

  return (
    <div className={classes.upper}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FormLabel component="legend">Current study year: </FormLabel>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
            </RadioGroup>
            <CardActions>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
