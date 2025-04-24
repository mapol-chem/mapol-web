import { Burger, Container, Group, Image, Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'
import classes from './HeaderMenu.module.css'
import mapol_logo from '../images/mapol-logo.png'

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false)

  return (
    <header className={classes.header}>
      <Container fluid style={{ padding: '0 150px 20px 150px' }}>
        <div className={classes.inner}>
          <Link to="/mapol-web">          
          <Image
            src={mapol_logo}
            style={{ width: '80px', height: 'auto' }}
            alt="Mapol Logo"
          /></Link>

          <Group gap={5} visibleFrom="sm">
            <Button component={Link} to="/mapol-web">
              Home
            </Button>
            <Button component={Link} to="/mapol-web/team">
              Team
            </Button>
            <Button component={Link} to="/mapol-web/publications">
              Publications
            </Button>
            <Button component={Link} to="/mapol-web/events">
              Events
            </Button>
            <Button component={Link} to="/mapol-web/Highlights">
              Highlights
            </Button>
            <Button component={Link} to="/mapol-web/Github">
              Github
            </Button>
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </div>
      </Container>
    </header>
  )
}
