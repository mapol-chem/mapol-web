import { Title, Container, Divider, Space, Grid } from '@mantine/core';
import teamData from '../data/team.json';

export const TeamsPage = () => {
  return (
    <Container fluid>
      <Title order={1}>Team</Title>
      <Space h="xl" />

      {Object.keys(teamData).map((groupName) => {
        const members = teamData[groupName];
        return (
          <div key={groupName}>
            <Title align="left" order={2}>
              {groupName}
            </Title>
            <Divider my="md" />
            <Grid>
              {members.map((name) => {
                return (
                  <Grid.Col span={{ base: 12, md: 6 }} key={name}>
                    {name}
                  </Grid.Col>
                );
              })}
            </Grid>
            <Space h="xl" />
            <Space h="lg" />
          </div>
        );
      })}
    </Container>
  );
};
