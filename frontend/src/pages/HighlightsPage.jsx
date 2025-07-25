import React from 'react';
import {
  Container,
  Space,
  Card,
  Text,
  Title,
  Group,
  Image,
  Stack,
  Divider,
  Flex,
  Anchor,
} from '@mantine/core';
import highlightData from '../data/highlights.json';
import dayjs from 'dayjs'; // Importing dayjs for date manipulation

// Function to format date strings using dayjs
const formatDate = (dateString) => {
  return dayjs(dateString).format('MMMM D, YYYY');
};

export const HighlightsPage = () => {
  return (
    <Container fluid>
      <Title order={1}>Highlights</Title>
      <Space h="xl" />
      <Stack>
        {highlightData.highlights.map((highlight, highlightIndex) => {
          const links = [];
          // if (highlight.fileName) {
          //   links.push({
          //     label: 'Download Highlight',
          //     url: `/mapol-web/assets/highlights/${highlight.fileName}`,
          //   });
          // }

          if (highlight.paperUrl) {
            links.push({ label: 'View Paper', url: highlight.paperUrl });
          }

          if (highlight.eventUrl) {
            links.push({ label: 'View Event', url: highlight.eventUrl });
          }

          return (
            <Card
              key={`highlight-${highlightIndex}`}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Flex align="flex-start">
                <Card.Section
                  style={{
                    maxWidth: '65%', // Maximum width for image section
                    marginRight: '30px', // Space between image and text content
                  }}
                >
                  <Image
                    src={`/mapol-web/assets/highlights/images/${highlight.featuredImage}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain', // Ensures the image is fully visible within its container
                    }}
                  />
                </Card.Section>
                <div style={{ flex: '1' }}>
                  <Group spacing="xs" mb="xs">
                    <Title order={4}>{highlight.title}</Title>
                  </Group>
                  {highlight.date && (
                    <Text size="md" mb="xs" fw={500}>
                      {formatDate(highlight.date)}
                    </Text>
                  )}
                  {highlight.authors && (
                    <Text size="sm" mb="xs" fs="italic" c="#696969">
                      {highlight.authors}
                    </Text>
                  )}
                  {highlight.summary && (
                    <Text size="sm" mb="xs">
                      {highlight.summary}
                    </Text>
                  )}
                  <Group spacing="xs" mt="md">
                    {links.map((link, linkIndex) => {
                      return (
                        <React.Fragment
                          key={`link-${highlightIndex}-${linkIndex}`}
                        >
                          {linkIndex > 0 && <Divider orientation="vertical" />}
                          <Anchor href={link.url} target="_blank" size="sm">
                            {link.label}
                          </Anchor>
                        </React.Fragment>
                      );
                    })}
                  </Group>
                </div>
              </Flex>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
};
