import EventsPage from './EventsPage'
import HomePage from './HomePage'

export default function App() {
  const isEventsPage = window.location.pathname.replace(/\/+$/, '') === '/events'
  return isEventsPage ? <EventsPage /> : <HomePage />
}
