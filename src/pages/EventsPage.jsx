import { Container } from '@mantine/core'
import { Calendar } from '@mantine/dates'

export const EventsPage = () => {
  return (
    <Container fluid style={{ padding: '0 150px 200px 150px' }}>
      <Calendar />
    </Container>
  )
}
