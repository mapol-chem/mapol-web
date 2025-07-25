import { Title, Container, Space, Image, Button, Group } from '@mantine/core';
import mapol_logo from '../images/mapol.jpeg';

export const TutorialsPage = () => {
  return (
    <Container fluid>
      <Title order={1}>Tutorials</Title>
      <Space h="xl" />

      <Group direction="column" spacing="md">
        <Button
          component="a"
          href="https://mybinder.org/v2/gh/mapol-chem/mapol-web/HEAD?urlpath=%2Fdoc%2Ftree%2Fnotebooks%2FQED-CIS-1.ipynb"
          target="_blank"
          size="lg"
          radius="md"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          leftSection={
            <Image
              src={mapol_logo}
              alt="Mapol logo"
              width={20}
              height={20}
              fit="contain"
            />
          }       
        >
          QED-CIS Python Notebook
        </Button>

        <Button
          component="a"
          href="https://mybinder.org/v2/gh/mapol-chem/mapol-web/HEAD?urlpath=%2Fdoc%2Ftree%2Fnotebooks%2FQED-HF_Tutorial.ipynb"
          target="_blank"
          size="lg"
          radius="md"
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime' }}
          leftSection={
            <Image
              src={mapol_logo}
              alt="Mapol logo"
              width={20}
              height={20}
              fit="contain"
            />
          }
        >
          QED-HF Tutorial Python Notebook
        </Button>
      </Group>

      <Space h="xl" />
    </Container>
  );
};