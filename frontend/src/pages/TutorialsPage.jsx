import { Title, Container, Space, Text, Anchor } from '@mantine/core';

export const TutorialsPage = () => {
    return (
    <Container fluid>
      <Title order={1}>Tutorials</Title>
      <Space h="xl" />
      <Anchor href="https://mybinder.org/v2/gh/mapol-chem/mapol-web/HEAD?urlpath=%2Fdoc%2Ftree%2Fnotebooks%2FQED-CIS-1.ipynb" target="_blank">QED-CIS Python Notebook</Anchor>
      <Space h="sm" />
      <Anchor href="https://mybinder.org/v2/gh/mapol-chem/mapol-web/HEAD?urlpath=%2Fdoc%2Ftree%2Fnotebooks%2FQED-HF_Tutorial.ipynb" target="_blank">QED-HF Tutorial Python Notebook</Anchor>
       </Container>
    )
}
