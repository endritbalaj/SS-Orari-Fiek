import { Slider } from '@material-ui/core'
import LoginPage from './chat/LoginPage/LoginPage'
import { Schedule } from './components/Schedule'
import { Subject } from './components/Subject'
import Chat from './chat/Chat'

export const routes = [
  {
    title: 'Distributed Systems',
  },
  {
    path: '/Subject',
    name: 'Subject',
    component: Subject,
    layout: '/dashboard',
  },
  {
    path: '/Schedule',
    name: 'Schedule',
    component: Schedule,
    layout: '/dashboard',
  },
  {
    path: '/Slider',
    name: 'Slider',
    component: Slider,
    layout: '/dashboard',
  },
  {
    path: '/Start',
    name: 'Start Chat',
    component: LoginPage,
    layout: '/dashboard',
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: Chat,
    layout: '/dashboard',
  },
]
