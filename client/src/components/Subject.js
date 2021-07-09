import { Fragment, useState } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import AddBoxIcon from '@material-ui/icons/AddBox'
import { useStyles } from './styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import { subjects } from './get-reqs'

export const Subject = () => {
  const classes = useStyles()

  const [year, setYear] = useState('')

  const handleYearChange = (event) => {
    setYear(event.target.value)
  }

  const [type, setType] = useState('')

  const handleTypeChange = (event) => {
    setType(event.target.value)
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const url = `${process.env.REACT_APP_WEBAPI}/Schedule/AddSubject`
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  const [register, setRegister] = useState({})

  const handleTextChange = (e) => {
    setRegister((prevData) => ({
      ...prevData,
      [e?.target?.id]: e.target.value,
    }))
  }

  const obj = {
    title: register.title,
    type: type,
    year: year,
    professorId: localStorage.getItem('id'),
  }

  const postData = (e) => {
    e.preventDefault()
    axios.post(url, obj, headers).then((res) => {
      if (res.status === 200) {
        handleCloseDialog()
      }
    })
  }

  return (
    <Fragment>
      <Container maxWidth='md' component='main' style={{ marginTop: '5%' }}>
        <Grid container spacing={5} alignItems='flex-end'>
          {subjects === undefined ? (
            <h1> Loading ... </h1>
          ) : (
            subjects.map((tier, key) => (
              <Grid
                item
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={4}
                key={tier.id}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    //   action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <Typography variant='h6' color='textSecondary'>
                      Year of studies: {tier.year}
                    </Typography>
                    <Typography variant='h6' color='textSecondary'>
                      Type: {tier.type === 1 ? 'Mandatory' : 'Non-Mandatory'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth color='inherit' onClick={handleClickOpen}>
                      Update
                    </Button>
                    <Button fullWidth color='inherit'>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      <Button
        color={'primary'}
        onClick={handleClickOpen}
        startIcon={<AddBoxIcon />}
        fullWidth
        size='large'
      >
        {' '}
        Add{' '}
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby='form-dialog-title'
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>Add Subject</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='Title'
            type='text'
            fullWidth
            onChange={handleTextChange}
          />
          <br />
          <br />

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id='demo-simple-select-label'>
              Year of studies
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='year'
              value={year}
              onChange={handleYearChange}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>

          <br />
          <br />

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id='demo-simple-select-label'>Course Type</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={type}
              onChange={handleTypeChange}
            >
              <MenuItem value={1}>Mandatory</MenuItem>
              <MenuItem value={2}>Non-Mandatory</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='primary'>
            Cancel
          </Button>
          <Button onClick={postData} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
