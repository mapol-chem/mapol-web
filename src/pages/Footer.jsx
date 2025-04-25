import { Anchor, Container, Group, Image } from '@mantine/core'
import classes from './Footer.module.css'
import mapol_logo from '../images/mapol-logo.png'

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
]

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
  ))

  return (
    <div className={classes.footer}>
      <Container fluid style={{ padding: '0 150px 0px 150px' }}>
        <div className={classes.inner}>
          <Image
            src={mapol_logo}
            style={{ width: '70px', height: 'auto' }}
            alt="Mapol Logo"
          />
          <Group className={classes.links}>{items}</Group>
        </div>
      </Container>
    </div>
  )
}
