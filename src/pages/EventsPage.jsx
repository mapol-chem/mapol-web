import { Container, Card, Stack, Title, Text, Anchor, Group } from '@mantine/core';

export const EventsPage = () => {

  const events = [
    {
      title: 'Computational chemistry workshop',
      description: 'Computational chemistry workshop with the Molecular Science Software Institute (MolSSI) and the Department of Chemistry at University of North Carolina, Charlotte for undergraduate and graduate students.',
      date: 'June 2024',
      link: 'https://pages.charlotte.edu/molssi-mapol-workshop/',
    },
    {
      title: 'Virtual Workshop on Molecular Cavity Quantum Electrodynamics',
      description: 'Virtual Workshop on Molecular Cavity Quantum Electrodynamics.',
      date: 'February 3-4, 2025',
      notes: 'https://drive.google.com/file/d/1E82GCBzrIyKMo7n9Hwqn9s92oJmTwozU/view',
      video1: 'https://www.youtube.com/watch?v=h2zXXnOx9Dw',
      video2: 'https://www.youtube.com/watch?v=3-CukHLV-hc',
    },
  ];
  
  return (
    <Container fluid>
      <Stack spacing="md">
      {events.map((event, index) => (
        <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
          <Stack spacing={4}>
            <Title order={4}>{event.title}</Title>
            <Text size="sm" c="dimmed">{event.description}</Text>
            <Text size="sm">Date: {event.date}</Text>
            <Group>
            {event.notes && <Anchor href={event.notes} target="_blank">Notes</Anchor>}
            {event.video1 && <Anchor href={event.video1} target="_blank">Video 1</Anchor>}
            {event.video2 && <Anchor href={event.video2} target="_blank">Video 2</Anchor>}
            </Group>
            {event.link && <Anchor href={event.link} target="_blank">View Event</Anchor>}
          </Stack>
        </Card>
      ))}
      </Stack>
    </Container>
  );
};
