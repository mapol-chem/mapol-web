import {
  Burger,
  Container,
  Group,
  Image,
  Button,
  Box,
  Drawer,
  Stack,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderMenu.module.css';
import mapol_logo_txt from '../images/mapol-logo-black-text.png';

export function HeaderMenu() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const navigation = [
    {
      path: '/',
      label: 'Home',
    },
    {
      path: '/team',
      label: 'Team',
    },
    {
      path: '/publications',
      label: 'Publications',
    },
    {
      path: '/events',
      label: 'Events',
    },
    {
      path: '/highlights',
      label: 'Highlights',
    },
        {
      path: '/tutorials',
      label: 'Tutorials',
    },
    {
      path: 'https://github.com/mapol-chem/mapol-web',
      label: 'Github',
      newTab: true,
    },
  ];

  return (
    <Box
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e0e0e0',
        padding: '10px 0',
      }}
    >
      <header>
        <Container
          fluid
          px={{ base: '20px', sm: '50px', md: '100px', lg: '150px' }}
        >
          <div className={classes.inner}>
            <Link to="/">
              <Image
                src={mapol_logo_txt}
                style={{ width: '150px', height: 'auto' }}
                alt="Mapol Logo"
              />
            </Link>

            <Group gap={5} visibleFrom="sm" ml="lg">
              {navigation.map((nav, index) => {
                return (
                  <Button
                    variant='subtle'
                    component={Link}
                    to={nav.path}
                    key={index}
                    {...(nav.newTab ? { target: '_blank' } : {})}
                  >
                    {nav.label}
                  </Button>
                );
              })}
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="sm"
            />
          </div>
        </Container>
      </header>

      <Drawer
        opened={opened}
        onClose={close}
        padding="md"
        size="xs"
        hiddenFrom="sm"
        position="right"
      >
        <Stack>
          {navigation.map((nav, index) => (
            <Button
              component={Link}
              to={nav.path}
              key={index}
              {...(nav.newTab ? { target: '_blank' } : {})}
              onClick={close}
            >
              {nav.label}
            </Button>
          ))}
        </Stack>
      </Drawer>
    </Box>
  );
}
