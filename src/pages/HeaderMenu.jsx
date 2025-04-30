import { Burger, Container, Group, Image, Button, Box } from "@mantine/core";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import classes from "./HeaderMenu.module.css";
import mapol_logo from "../images/mapol-logo.png";

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e0e0e0",
        padding: "10px 0",
      }}
    >
      <header>
        <Container
          fluid
          px={{ base: "20px", sm: "50px", md: "100px", lg: "150px" }}
        >
          <div className={classes.inner}>
            <Link to="/">
              <Image
                src={mapol_logo}
                style={{ width: "80px", height: "auto" }}
                alt="Mapol Logo"
              />
            </Link>

            <Group gap={5} visibleFrom="sm">
              <Button component={Link} to="/">
                Home
              </Button>
              <Button component={Link} to="/team">
                Team
              </Button>
              <Button component={Link} to="/publications">
                Publications
              </Button>
              <Button component={Link} to="/events">
                Events
              </Button>
              <Button component={Link} to="/highlights">
                Highlights
              </Button>
              <Button
                component={Link}
                to="https://github.com/mapol-chem/mapol-web"
                target="_blank"
              >
                Github
              </Button>
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
    </Box>
  );
}
