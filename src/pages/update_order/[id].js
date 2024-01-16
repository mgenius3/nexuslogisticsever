import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AccountProfile } from "src/sections/account/account-profile";
import { AccountProfileDetails } from "src/sections/account/account-profile-details-edit";
import { useRouter } from "next/router";
import { Divider } from "@mui/material";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Update Order</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Update Order</Typography>
              <Divider />
              <Typography variant="subtitle2" style={{ marginTop: "5px" }}>
                TRACKING ID : {`${id}`}
              </Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                {/* <Grid xs={12} md={6} lg={4}>
                <AccountProfile />
              </Grid> */}
                <Grid xs={12} md={6} lg={8}>
                  <AccountProfileDetails id={id} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
