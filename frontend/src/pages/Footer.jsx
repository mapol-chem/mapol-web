import { Anchor, Container, Group, Image } from '@mantine/core';
import classes from './Footer.module.css';
import mapol_logo_txt from '../images/mapol-logo-black-text.png';

const links = [
  // { link: '#', label: 'Contact' },
  // { link: '#', label: 'Privacy' }
];

export const Footer = () => {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="xs"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <footer className={classes.footer}>
      <Container
        fluid
        px={{ base: '20px', sm: '50px', md: '100px', lg: '150px' }}
      >
        <div className={classes.inner}>
          <Image
            src={mapol_logo_txt}
            style={{ width: '100px', height: 'auto' }}
            alt="Mapol Logo"
          />
          <Group className={classes.links}>{items}</Group>
        </div>
      </Container>
    </footer>
  );
};
