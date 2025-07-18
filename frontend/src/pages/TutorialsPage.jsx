import { Title, Container, Space, Text, Anchor } from '@mantine/core';

export const TutorialsPage = () => {
    return (
    <Container fluid>
      <Title order={1}>Tutorials</Title>
      <Space h="xl" />
      <Anchor href="https://mybinder.org/v2/gh/mapol-chem/psi4polaritonic/live_nb" target="_blank">Jupyter Notebooks</Anchor>
       </Container>
    )
}
