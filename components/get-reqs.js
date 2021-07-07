import axios from 'axios'

let subjects = []

const setSubjects = async () => {
  await axios
    .get(
      `${
        process.env.REACT_APP_WEBAPI
      }/Schedule/GetSubjects?professorId=${localStorage.getItem('id')}`
    )
    .then((res) => {
      res.data.forEach((e) => subjects.push(e))
    })
}

setSubjects()

let schedules = []

const setSchedules = async () => {
  await axios
    .get(
      `${
        process.env.REACT_APP_WEBAPI
      }/Schedule/GetAllSchedules?id=${localStorage.getItem('id')}`
    )
    .then((res) => {
      res.data.forEach((e) => {
        schedules.push(e)
      })
    })
}
setSchedules()

export { subjects, schedules }
