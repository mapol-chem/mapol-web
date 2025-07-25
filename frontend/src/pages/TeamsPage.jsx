import {
  Title,
  Container,
  Divider,
  Space,
  Grid,
  Group,
  Anchor,
} from '@mantine/core'
import teamData from '../data/team.json'

export const TeamsPage = () => {
  return (
    <Container fluid>
      <Title order={1}>Team</Title>
      <Space h="xl" />

      {Object.keys(teamData).map((groupName) => {
        const members = teamData[groupName]
        return (
          <div key={groupName}>
            <Title align="left" order={2}>
              {groupName}
            </Title>
            <Divider my="md" />
            <Grid>
              {members.map((person) => {
                return (
                  <Grid.Col span={{ base: 12, md: 6 }} key={person.name}>
                    <Group>
                      {person.scholar ? (
                        <Anchor href={person.scholar} target="_blank" size="md">
                          {person.name}
                        </Anchor>
                      ) : (
                        person.name
                      )}
                    </Group>
                  </Grid.Col>
                )
              })}
            </Grid>
            <Space h="xl" />
            <Space h="lg" />
          </div>
        )
      })}
    </Container>
  )
}
