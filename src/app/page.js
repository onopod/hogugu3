"use client"

import { AppBar, BottomBar, Card, SearchDialog, } from '@/app/components';
import { Box, Chip, Container, Pagination, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
  const pageSize = 10;
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(1);
  const [prefectureId, setPrefectureId] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [freeWord, setFreeWord] = useState(null)
  const [therapists, setTherapists] = useState([]);
  const [count, setCount] = useState(0);
  const [prefectures, setPrefectures] = useState([])
  const [menus, setMenus] = useState([])
  const [regions, setRegions] = useState([])

  useEffect(() => {
    fetch("/api/prefectures")
      .then(res => res.json())
      .then(data => setPrefectures(data.prefectures))
    fetch("/api/menus")
      .then(res => res.json())
      .then(data => setMenus(data.menus))
    fetch("/api/regions")
      .then(res => res.json())
      .then(data => setRegions(data.regions))
  }, [])


  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("page", page);
    searchParams.set("pageSize", pageSize);
    if (prefectureId) {
      searchParams.set("prefectureId", prefectureId);
    }
    if (menuId) {
      searchParams.set("menuId", menuId);
    }
    if (freeWord) {
      searchParams.set("freeWord", freeWord)
    }

    const url = ['/api/therapists', searchParams.toString()].join("?");
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTherapists(data.therapists);
        setItemCount(data.itemCount);
        setCount(Math.ceil(data.itemCount / pageSize))
      })
  }, [page, prefectureId, menuId, freeWord])

  const onPageChange = (_, page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(page)
  }

  const onPrefectureClick = (prefectureId) => {
    reset()
    setPage(1)
    setPrefectureId(prefectureId)
    setMenuId(null)
    setFreeWord("")
  }

  const { register, handleSubmit, setValue, reset, watch } = useForm({
    defaultValues: {
      prefectureId: "",
      menuId: "",
      freeWord: "",
    },
  });
  const onSubmit = data => {
    setPrefectureId(data.prefectureId)
    setMenuId(data.menuId)
    setFreeWord(data.freeWord)
  }
  const handleFavoriteClick = (therapistId) => {
    fetch(`/api/favorites/toggle/${therapistId}`)
  }

  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <SearchDialog
          prefectures={prefectures}
          menus={menus}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register} setValue={setValue}
          watch={watch}
          reset={reset} />
        {itemCount}件
        {(therapists ? (
          <>
            {therapists.map((therapist, idx) => <Card key={idx} therapist={therapist} handleFavoriteClick={handleFavoriteClick} />)}
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
        <h3>地域検索</h3>
        <Stack direction="column" spacing={2}>
          {regions.map(region => (
            <Stack key={region.id} direction="column">
              <Box>{region.name}</Box>
              <Box>{region.prefectures?.map(prefecture => <Chip key={prefecture.id}
                size="small"
                label={prefecture.name}
                onClick={() => onPrefectureClick(prefecture.id)} />)}</Box>
            </Stack>
          )
          )}
        </Stack>
      </Container>
      <BottomBar />
    </>
  );
}