"use client"
import { Box, Container, Pagination, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import AppBar from './components/AppBar';
import BottomBar from "./components/BottomBar";
import Card from './components/Card';
import SearchDialog from "./components/SearchDialog";

export default function Home() {
  const pageSize = 10;
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(1);
  const [therapists, setTherapists] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page);
    searchParams.set("pageSize", pageSize);

    const url = ['/api/therapists', searchParams.toString()].join("?");
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTherapists(data.therapists);
        setItemCount(data.itemCount);
        setCount(Math.ceil(data.itemCount / pageSize))
      })
  }, [page])

  const onPageChange = (_, page) => {
    setPage(page)
  }
  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        {itemCount}件
        {(therapists ? (
          <>
            <SearchDialog />
            {therapists.map((therapist, idx) => (
              <Card key={idx} therapist={therapist} />

            )
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                onChange={onPageChange}
                count={count} color="primary" size="large" />
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
