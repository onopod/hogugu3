"use client"

import { getPrefectures, getGenders, getMenus, getRegions, toggleFavorite } from "@/app/actions";
import { getTherapists, getTherapistsCount } from "@/app/actions";
import { AppBar, BottomBar, Card, SearchDialog, } from '@/app/components';
import { Box, Chip, Container, Pagination, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function Home() {
  const [itemCount, setItemCount] = useState(0);
  const [page, setPage] = useState(1);
  const [therapists, setTherapists] = useState([]);
  const [count, setCount] = useState(0);
  const [prefectures, setPrefectures] = useState([])
  const [genders, setGenders] = useState([])
  const [menus, setMenus] = useState([])
  const [regions, setRegions] = useState([])

  const { register, handleSubmit, setValue, reset, watch, getValues } = useForm({
    defaultValues: {
      prefectureId: "",
      genderId: "",
      menuId: "",
      freeWord: "",
    },
  });

  const fetchMasterData = async () => {
    setPrefectures(await getPrefectures())
    setGenders(await getGenders())
    setMenus(await getMenus())
    setRegions(await getRegions())
  }

  const fetchData = async () => {
    const pageSize = 10;
    const values = getValues();
    const where = {
      page,
      ...(values.prefectureId ? { prefectureId: Number(values.prefectureId) } : {}),
      ...(values.genderId ? { genderId: Number(values.genderId) } : {}),
      ...(values.menuId ? { menuId: Number(values.menuId) } : {}),
      ...(values.freeWord ? { freeWord: values.freeWord } : {})
    }
    const currentItemCount = await getTherapistsCount(where);
    const currentTherapists = await getTherapists(where)
    setTherapists(currentTherapists)
    setItemCount(currentItemCount);
    setCount(Math.ceil(currentItemCount / pageSize))
  }

  useEffect(() => {
    fetchMasterData();
    fetchData()
    // eslint-disable-next-line
  }, [])

  const onPageChange = (_, page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(page + 1)
    fetchData()
  }

  const onPrefectureClick = (prefectureId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    reset()
    setValue("prefectureId", String(prefectureId));
    fetchData()
  }

  const onSubmit = () => fetchData()

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
          register={register}
          setValue={setValue}
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