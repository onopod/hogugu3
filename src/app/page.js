"use client"
import { Box, Container, Pagination, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import AppBar from './components/AppBar';
import BottomBar from "./components/BottomBar";
import Card from './components/Card';
import LoginBtn from "./components/LoginBtn";
import SearchDialog from "./components/SearchDialog";

export default function Home() {
  const [therapists, setTherapists] = useState(false);
  useEffect(() => {
    fetch('/api/therapists')
      .then((res) => res.json())
      .then((data) => {
        setTherapists(data.therapists)
      })
  }, [])
  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <LoginBtn />
        {(therapists ? (
          <>
            <SearchDialog />
            {therapists.map((therapist, idx) => (
              <Card key={idx} therapist={therapist} />

            )
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination count={3} color="primary" size="large" />
            </Box>
          </>
        ) : (
          <>
            <Skeleton />
          </>
        ))}
      </Container>
      <BottomBar />
    </>
  );
}
