import {
  Container,
  Title,
  Text,
  Space,
  Stack,
  Card,
  Badge,
  Group,
  Image,
  Flex,
  Anchor,
} from '@mantine/core';
import pub1 from '../images/publications/pub1.jpeg';
import pub3 from '../images/publications/pub3.jpeg';
import pub4 from '../images/publications/pub4.jpeg';
import pub5 from '../images/publications/pub5.jpeg';
import pub6 from '../images/publications/pub6.jpeg';
import pub10 from '../images/publications/pub10.jpeg';
import pub11 from '../images/publications/pub11.jpeg';
import pub12 from '../images/publications/pub12.jpeg';

export const Publications = () => {
  const publications = [
    {
      title: 'Ab initio Methods for Polariton Chemistry',
      authors: 'J. J. Foley IV, J. McTague, A. E. DePrince',
      journal: 'Chem. Phys. Rev. 4, 041301 (2023)',
      link: 'https://doi.org/10.1063/5.0167243',
      image: pub1,
    },
    {
      title:
        'Relativistic Resolution-of-the-Identity with Cholesky Integral Decomposition',
      authors: 'S. Banerjee, T. Zhang, K. G. Dyall, X. Li',
      journal: 'J. Chem. Phys., 159, 114119 (2023)',
      link: 'https://pubs.aip.org/aip/jcp/article/159/11/114119/2911780',
    },
    {
      title:
        'Quantum Simulation of Boson-Related Hamiltonians: Techniques, Effective Hamiltonian Construction, and Error Analysis ',
      authors:
        'B. Peng, Y. Su, D. Claudino, K. Kowalski, G. H. Low, M. Roetteler',
      journal: '',
      link: 'https://arxiv.org/abs/2307.06580',
      image: pub3,
    },
    {
      title:
        'Cavity Quantum Electrodynamics Complete Active Space Configuration Interaction Theory',
      authors:
        'N. Vu, D. Mejia-Rodriguez, N. P. Bauman, A. Panyala, E. Mutlu, N. Govind, J. J. Foley IV',
      journal:
        'Journal of Chemical Theory and Computation 2024 20 (3), 1214-1227',
      link: 'https://doi.org/10.1021/acs.jctc.3c01207',
      image: pub4,
    },
    {
      title:
        'Dirac-Coulomb-Breit Molecular Mean-Field Exact-Two-Component Relativistic Equation-of-Motion Coupled-Cluster Theory',
      authors:
        'T. Zhang, S. Banerjee, L. N. Koulias, E. F. Valeev, A. E. DePrince, X. Li,',
      journal: 'J. Phys. Chem. A, 2024, 128, 3408-3418 (2024)',
      link: 'https://pubs.acs.org/doi/full/10.1021/acs.jpca.3c08167',
      image: pub5,
    },
    {
      title:
        'Comparing Parameterized and Self-Consistent Approaches to Ab initio CQED for Molecular Polaritonic Systems',
      authors: 'R. R. Manderna, N. Vu, J. J. Foley IV',
      journal: 'J. Chem. Phys. 161, 174105 (2024)',
      link: 'https://pubs.aip.org/aip/jcp/article/161/17/174105/3318463',
      image: pub6,
    },
    {
      title:
        'Quantum Electrodynamics Coupled-Cluster Theory: Exploring Photon-Induced Electron Correlations,',
      authors:
        'H. Pathak, A. Panyala, N.P. Bauman, D. Mejia-Rodriguez, N. Govind, K. Kowalski',
      journal: '',
      link: 'https://arxiv.org/abs/2409.06858',
      status: '',
    },
    {
      title:
        'Real-Time Time-Dependent Cavity Quantum Electrodynamics in Gaussian Basis ',
      authors: 'D. Mejia-Rodriguez, N. Vu, J. J. Foley IV, N. Govind,',
      journal: '',
      status: 'in preparation',
    },
    {
      title:
        'A Meta-Generalized Gradient Approximation Exchange-Correlation Functional for Strongly Coupled Light-Matter Systems ',
      authors: 'D. Mejia-Rodriguez, N. Govind',
      journal: '',
      status: 'in preparation',
    },
    {
      title:
        'Polaritonic Chemistry Using the Density Matrix Renormalization Group Method',
      authors: 'M. Matoušek, N. Vu, N. Govind, J. J. Foley IV, L. Veis',
      journal: 'J. Chem. Theory Comput, 20, 9424−9434 (2024)',
      link: 'https://doi.org/10.1021/acs.jctc.4c00986',
      image: pub10,
    },
    {
      title: 'Electronic Structure Simulations in Cloud Computing Environment',
      authors:
        'E.J. Bylaska, A. Panyala, B. Peng, D. Mejia-Rodriguez, N. Govind, K. Kowalski, et al.',
      journal: 'J. Chem. Phys. 161, 150902, 2024 ',
      link: 'https://pubs.aip.org/aip/jcp/article/161/15/150902/3317271',
      image: pub11,
    },
    {
      title: 'Computational Modeling of Polariton Chemistry',
      authors: 'R. R. Manderna, P. Roden, L. Tolley, N. Vu, J. J. Foley IV',
      journal: 'American Chemical Society (2025) ',
      link: 'https://pubs.acs.org/doi/book/10.1021/acsinfocus.7e8013',
      image: pub12,
    },
  ];
  return (
    <>
      <Container fluid>
        <Title order={1}>Publications</Title>
        <Space h="xl" />
        <Stack spacing="md">
          {publications.map((pub, index) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
              <Flex
                justify="space-between"
                gap="md"
                align="flex-start"
                wrap="wrap"
              >
                <Stack spacing={4} style={{ flex: 1, minWidth: 250 }}>
                  <Group spacing="xs">
                    <Title order={4}>
                      {index + 1}. {pub.title}
                      {pub.status && (
                        <Badge variant="light" color="#cd9bff" mt="xs" mb="sm">
                          {pub.status}
                        </Badge>
                      )}
                    </Title>
                  </Group>
                  <Text size="sm" mt="xs" fs="italic" c="#696969">
                    {pub.authors}
                  </Text>
                  <Text size="sm">{pub.journal}</Text>
                  {pub.link && (
                    <Group>
                      <Anchor href={pub.link} target="_blank" size="sm">
                        View Publication
                      </Anchor>
                    </Group>
                  )}
                </Stack>
                {pub.image && (
                  <Image
                    src={pub.image}
                    alt={pub.title}
                    height={150}
                    fit="cover"
                  />
                )}
              </Flex>
            </Card>
          ))}
        </Stack>
      </Container>
    </>
  );
};
