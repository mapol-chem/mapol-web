import {
  Container,
  Space,
  Card,
  Text,
  Title,
  Group,
  Image,
  SimpleGrid,
  Divider,
} from "@mantine/core";
import highlightData from "../data/highlights.json";

export const HighlightsPage = () => {
  return (
    <Container fluid>
      <Title order={1}>Highlights</Title>
      <Space h="xl" />
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        {highlightData.highlights.map((highlight, index) => (
          <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section
              style={{
                position: "relative", // To make position absolute work correctly
                height: 0,
                paddingBottom: "56.25%", // 16:9 aspect ratio (you can change this as needed)
              }}
            >
              <Image
                src={`/mapol-web/assets/highlights/images/${highlight.featuredImage}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Adjusts the image to cover the specified area
                }}
              />
            </Card.Section>
            <Group spacing="xs" py="xs">
              <Title order={4}>{highlight.title}</Title>
            </Group>
            {highlight.authors && (
              <Text size="sm" mb="xs" fs="italic" c="#696969">
                {highlight.authors}
              </Text>
            )}
            <Group spacing="xs" mt="xs">
              <Text
                component="a"
                href={`/mapol-web/assets/highlights/${highlight.fileName}`}
                target="_blank"
                c="#4d4dff"
                size="sm"
              >
                View highlight
              </Text>
              {highlight.paperUrl && (
                <>
                  <Divider orientation="vertical" mx="xs" />
                  <Text
                    component="a"
                    href={highlight.paperUrl}
                    target="_blank"
                    c="#4d4dff"
                    size="sm"
                  >
                    View paper
                  </Text>
                </>
              )}
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};
