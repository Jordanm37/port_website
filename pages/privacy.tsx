import { NextPage } from "next";
import { MainLayout } from "../components/layout";
import { PageContainer } from "../components/ui";
import { Heading, Text } from "@chakra-ui/react";

const PrivacyPage: NextPage = () => {
  return (
    <MainLayout>
      <PageContainer>
        <Heading as="h1" size="2xl">
          Privacy
        </Heading>
        <Text color="muted">
          This site does not collect personal data beyond standard server logs. For inquiries,
          contact jordan.moshcovitis@gmail.com.
        </Text>
      </PageContainer>
    </MainLayout>
  );
};

export default PrivacyPage;
