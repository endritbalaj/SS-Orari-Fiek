import { Route } from 'react-router-dom'

export const getRoutes = (routes) => {
  return routes.map((prop, key) => {
    if (prop.layout === '/dashboard') {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      )
    } else {
      return null
    }
  })
}
