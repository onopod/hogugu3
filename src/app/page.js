"use client"

import { getPrefectures, getGenders, getMenus, getRegions, toggleFavorite } from "@/app/actions";
import { getTherapists, getTherapistsCount } from "@/app/actions";
import { AppBar, BottomBar, Card, SearchDialog, } from '@/app/components';
import { Box, Chip, Container, Pagination, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function Home() {
  const pageSize = 10;
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(1);
  const [prefectureId, setPrefectureId] = useState(null);
  const [genderId, setGenderId] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [freeWord, setFreeWord] = useState(null)
  const [therapists, setTherapists] = useState([]);
  const [count, setCount] = useState(0);
  const [prefectures, setPrefectures] = useState([])
  const [genders, setGenders] = useState([])
  const [menus, setMenus] = useState([])
  const [regions, setRegions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setPrefectures(await getPrefectures())
      setGenders(await getGenders())
      setMenus(await getMenus())
      setRegions(await getRegions())
    }
    fetchData();
  }, [])


  useEffect(() => {
    const fetchTherapist = async () => {
      const therapists = await getTherapists({ page, prefectureId, genderId, menuId, freeWord })
      setTherapists(therapists);
    }
    fetchTherapist()

    const fetchTherapistCount = async () => {
      const itemCount = await getTherapistsCount({ page, prefectureId, genderId, menuId, freeWord })
      setItemCount(itemCount);
      setCount(Math.ceil(itemCount / pageSize))
    }
    fetchTherapistCount()
  }, [page, prefectureId, genderId, menuId, freeWord])

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
      genderId: "",
      menuId: "",
      freeWord: "",
    },
  });
  const onSubmit = data => {
    setPrefectureId(data.prefectureId)
    setGenderId(data.genderId)
    setMenuId(data.menuId)
    setFreeWord(data.freeWord)
  }
  const handleFavoriteClick = (therapistId) => {
    const toggleData = async (therapistId) => {
      await toggleFavorite(therapistId)
    }
    toggleData(therapistId)
  }

  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <SearchDialog
          prefectures={prefectures}
          genders={genders}
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