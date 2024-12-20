import { FormControl, Box, Button, Grid2 as Grid, MenuItem, Select, Stack, TextField, InputLabel, Grid2 } from '@mui/material';

export default function FullScreenDialog({ prefectures, genders, menus, handleSubmit, onSubmit, register, setValue, watch, reset }) {
    const selectedPrefecture = watch("prefectureId");
    const selectedGender = watch("genderId");
    const selectedMenuId = watch("menuId");

    return (
        <Box sx={{ my: 1, width: "100%" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={1}>
                    <Grid2 size={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="prefectureId">地域</InputLabel>
                            <Select labelId="prefectureId"
                                id="prefectureId"
                                value={selectedPrefecture}
                                onChange={(e) => setValue("prefectureId", e.target.value)}
                                displayEmpty>
                                {prefectures.map(prefecture => <MenuItem key={prefecture.id} value={prefecture.id}>{prefecture.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="genderId">性別</InputLabel>
                            <Select id="genderId"
                                labelId="genderId"
                                value={selectedGender}
                                onChange={(e) => setValue("genderId", e.target.value)}
                                displayEmpty
                            >
                                {genders.map(gender => <MenuItem key={gender.id} value={gender.id}>{gender.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="menuId">メニュー</InputLabel>
                            <Select labelId="menuId"
                                id="menuId"
                                value={selectedMenuId}
                                onChange={(e) => setValue("menuId", e.target.value)}
                                displayEmpty>
                                {menus.map(menu => <MenuItem key={menu.id} value={menu.id}>{menu.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={6}>
                        <FormControl variant="standard" fullWidth>
                            <TextField variant="standard" label="フリーワード"
                                id="freeWord"
                                {...register("freeWord")} />
                        </FormControl>
                    </Grid2>
                    <Grid2 size={8}>
                        <FormControl fullWidth>
                            <Button variant="contained" type="submit">送信</Button>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={4}>
                        <FormControl fullWidth>
                            <Button variant="outlined" onClick={() => reset()}>リセット</Button>
                        </FormControl>
                    </Grid2>
                </Grid2>

            </form>
        </Box >
    );
}