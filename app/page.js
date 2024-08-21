"use client";
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Button,
  colors,
  Container,
  Toolbar,
  Typography,
  Box,
  Grid,
  Link,
} from "@mui/material";
import Head from "next/head";

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()
    if (checkoutSession.statusCode === 500){
      console.error(checkoutSession.message)
      return
    }
    
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error){
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>flashcard</title>
        <meta name="flashcard-description" content="Create flashcard from your text" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            AI Flashcard Generator
          </Typography>
          <SignedOut>
            <Button
              sx={{
                color: "white",
              }}
              href="/sign-in"
            >
              Login
            </Button>
            <Button
              sx={{
                color: "white",
              }}
              href="/sign-up"
            >
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          textAlign: "center",
          my: 4,
        }}
      >
        <Typography variant="h2">Welcome to Flashcard</Typography>

        <Typography variant="h5">The best way to create flashcard</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/generate">
          Get started
        </Button>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4"> Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6"> Easy text input</Typography>
            <Typography>paste your</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6"> Easy text input</Typography>
            <Typography>paste your text and let the rest.</Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6"> Easy text input</Typography>
            <Typography>
              paste your text and let out software to do the rest.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4"> Pricing </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: "2px solid grey", borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                {" "}
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                {" "}
                $10/month
              </Typography>
              <Typography>
                get access to unlimited flashcard, with priority support
              </Typography>
              <Button variant={"contained"} color={"primary"} sx={{ mt: 2 }} onClick={handleSubmit}>
                Choose Pro
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, border: "2px solid grey", borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                {" "}
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                {" "}
                $5/month
              </Typography>
              <Typography>
                get access to our basic features and limited storage
              </Typography>
              <Button variant={"contained"} color={"primary"} sx={{ mt: 2 }}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
