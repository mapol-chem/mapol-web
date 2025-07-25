import {
  Title,
  List,
  Text,
  Center,
  Container,
  Image,
  Stack,
  Grid,
  Space,
  Divider,
  Box,
} from '@mantine/core';
import mapol_graphic from '../images/mapol.jpeg';
export const HomePage = () => {
  return (
    <>
      <Container fluid>
        <Title align="left" order={1}>
          Many-Body Methods, Spectroscopies, and Dynamics for Molecular
          Polaritonic Systems
        </Title>

        {/* <Grid align="center"> */}
        <Box pt="lg">
          <Grid justify="center" align="center">
            <Grid.Col span={8}>
              <Text align="justify" fw={500}>
                Light when nanoconfined in cavities and made to interact
                strongly with molecules results in hybrid light–matter states or
                polaritons, which can be used to modify and manipulate ground
                and excited-state potential energy surfaces and thus alter the
                reactivity and energy flow profoundly in molecular systems.The
                development of predictive theories for molecular polaritons
                requires combining electronic degrees of freedom, as provided by
                quantum chemistry methods, with quantum electrodynamics (QED)
                treatments of the photonic degrees of freedom.
              </Text>
              <Space h="sm" />
              <Text fw={500} align="justify">
                Our vision is to develop a suite of theoretical frameworks,
                spanning low-order to high-level many-body methods, that will
                provide unprecedented ability to capture the structure and
                dynamics of molecular polaritonic systems and deliver scalable
                software source code and libraries that can harness
                leadership-class computational facilities (LCFs). In pursuit of
                this vision, we have three project objectives to guide our
                research program, which was initiated in September 2022.
              </Text>
            </Grid.Col>
            <Grid.Col span="auto">
              <Image
                src={mapol_graphic}
                fit="contain"
                width="100%"
                height="auto"
                style={{ maxHeight: '250px' }}
                alt="Mapol Graphic"
              />
            </Grid.Col>
          </Grid>
        </Box>
        <Space h="xl" />
        <Title align="left" order={2}>
          Objectives
        </Title>
        <Divider my="md" />
        <List type="ordered" spacing="md">
          <List.Item>
            <Text size="md" align="left">
              Develop a Gaussian basis set–based suite of methods spanning
              low-order to high-level ab initio many-body approaches for
              modeling and simulation of molecular polaritonic systems.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="md" align="left">
              Implement polaritonic many-body methods to fully utilize modern
              heterogeneous (CPU/GPU) high-performance computing platforms at
              DOE’s LCFs.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="md" align="left">
              Apply developed methods to molecular polaritonic systems to
              validate, benchmark, and assess our developments with reference
              systems, progressing to advanced applications to complement
              experiments to enhance fundamental understanding of polaritonic
              chemistry.
            </Text>
          </List.Item>
        </List>
        <Space h="xl" />
        <Title align="left" order={2}>
          Funding
        </Title>
        <Divider my="md" />
        <Text size="md" align="left">
          The Center for Many-Body Methods, Spectroscopies, and Dynamics for
          Molecular Polaritonic Systems (MAPOL) is funded under FWP 79715 as
          part of the Computational Chemical Sciences (CCS) program by the U.S.
          Department of Energy, Office of Science, Office of Basic Energy
          Sciences, Division of Chemical Sciences, Geosciences and Biosciences
          at Pacific Northwest National Laboratory (PNNL). PNNL is a
          multiprogram national laboratory operated by Battelle Memorial
          Institute for the United States Department of Energy under DOE
          contract number DE-AC05-76RL1830.
        </Text>
      </Container>
    </>
  );
};
