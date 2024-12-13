"use client"
import { Box, Container, Pagination, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import AppBar from './components/AppBar';
import BottomBar from "./components/BottomBar";
import Card from './components/Card';
import SearchDialog from "./components/SearchDialog";
import { useForm } from "react-hook-form";


export default function Home() {
  const pageSize = 10;
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(1);
  const [prefectureId, setPrefectureId] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page);
    searchParams.set("pageSize", pageSize);
    searchParams.set("prefectureId", prefectureId);

    const url = ['/api/therapists', searchParams.toString()].join("?");
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTherapists(data.therapists);
        setItemCount(data.itemCount);
        setCount(Math.ceil(data.itemCount / pageSize))
      })
  }, [page, prefectureId])

  const onPageChange = (_, page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(page)
  }


  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      prefectureId: "",
    },
  });
  const onSubmit = data => {
    setPrefectureId(data.prefectureId)
  }


  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        {itemCount}件
        {(therapists ? (
          <>
            <SearchDialog register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} setValue={setValue} watch={watch} />
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
