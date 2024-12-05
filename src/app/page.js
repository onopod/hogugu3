"use client"
import { Box, Container, Pagination, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import AppBar from './components/AppBar';
import BottomBar from "./components/BottomBar";
import Card from './components/Card';
import SearchDialog from "./components/SearchDialog";

export default function Home() {
  const [therapists, setTherapists] = useState(false)
  useEffect(() => {
    setTherapists(["A", "B", "c", "D", "E", "F", "G"]);
  }, [])
  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        {(therapists ? (
          <>
            <SearchDialog />
            {therapists.map((post, idx) => (
              <Card key={idx} />
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
