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
import { schedules, subjects } from './get-reqs'

export const Schedule = () => {
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

  const url = `${process.env.REACT_APP_WEBAPI}/Schedule/AddSchedule`
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

  const findSubjectYear = (id) => {
    return subjects.find((e) => e.id === id).year
  }

  const obj = {
    name: register.title,
    type: type,
    year: 0,
    professorId: localStorage.getItem('id'),
    startTime: register.startTime,
    endTime: register.endTime,
    date: register.date,
    subjectId: year,
  }

  const [tempId, setTempId] = useState([])

  const postData = (e) => {
    e.preventDefault()
    axios.post(url, obj, headers).then((res) => {
      if (res.status === 200) {
        const rmqUrl = `${process.env.REACT_APP_RMQ}/api/schedule`
        axios
          .get(
            `${
              process.env.REACT_APP_WEBAPI
            }/User/GetStudyYear?year=${findSubjectYear(year)}`
          )
          .then((e) => {
            setTempId(e.data)
          })

        let mrk = []

        tempId.forEach((e) => {
          mrk.push({
            title: 'Test',
            email: e,
            professor: 'temp',
            date: 'data',
          })
        })
        console.log(mrk)
        axios
          .post(rmqUrl, mrk, {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          })
          .then((v) => console.log(v))
          .catch((v) => console.log(v))
      }
    })
  }

  const handleDelete = (e) => {
    const url = `${process.env.REACT_APP_WEBAPI}/Schedule/Delete`
    axios
      .delete(url, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        data: {
          id: e.target.id,
        },
      })
      .then((r) => console.log(r))
      .catch((c) => console.log(c))
  }

  return (
    <Fragment>
      <Container maxWidth="md" component="main" style={{ marginTop: '5%' }}>
        <Grid container spacing={5} alignItems="flex-end">
          {schedules === undefined ? (
            <h1> Loading ... </h1>
          ) : (
            schedules.map((tier, key) => (
              <Grid
                item
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={4}
                key={tier.id}
              >
                <Card>
                  <CardHeader
                    title={tier.name}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    //   action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">
                      Subject: A
                      {subjects.find((e) => e.id === tier.subjectId).title}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Start Time: {tier.startTime}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      End Time: {tier.endTime}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      Type:{' '}
                      {tier.repeatable === true
                        ? 'Repeatable'
                        : 'Non-Repeatable'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth color="inherit" onClick={handleClickOpen}>
                      Update
                    </Button>
                    <Button
                      id={tier.id}
                      fullWidth
                      color="inherit"
                      onClick={handleDelete}
                    >
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
        size="large"
      >
        {' '}
        Add{' '}
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Add Schedule</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={handleTextChange}
          />
          <br />
          <br />
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Date"
            type="date"
            fullWidth
            onChange={handleTextChange}
          />
          <br />
          <br />

          <TextField
            autoFocus
            margin="dense"
            id="startTime"
            label="Start Time"
            type="time"
            fullWidth
            onChange={handleTextChange}
          />

          <br />
          <br />

          <TextField
            autoFocus
            margin="dense"
            id="endTime"
            label="End Time"
            type="time"
            fullWidth
            onChange={handleTextChange}
          />
          <br />
          <br />

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Subject</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="year"
              value={year}
              onChange={handleYearChange}
            >
              {subjects.map((val, key) => (
                <MenuItem key={key} id={val.id} value={val.id}>
                  {val.title} || Year: {val.year}{' '}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <br />
          <br />

          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Event type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={handleTypeChange}
            >
              <MenuItem value={true}>Repeatable</MenuItem>
              <MenuItem value={false}>Non-Repeatable</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={postData} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
