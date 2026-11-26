import EventsPage from './EventsPage'
import HomePage from './HomePage'
import PlacesPage from './PlacesPage'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path === '/events') return <EventsPage />
  if (path === '/places') return <PlacesPage />
  return <HomePage />
}
