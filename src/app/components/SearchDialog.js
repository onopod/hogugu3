import { Box, Button, FormControl, Grid2, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';

export default function SearchDialog({ prefectures, genders, menus, handleSubmit, onSubmit, register, setValue, watch, reset }) {
    const selectedPrefecture = watch("prefectureId");
    const selectedGender = watch("genderId");
    const selectedMenuId = watch("menuId");
    return (
        <Box sx={{ my: 1, width: "100%" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={1}>
                    <Grid2 size={4} sx={{

                    }}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="treatmentDt">　</InputLabel>
                            <Input labelId="treatmentDt"
                                style={{ paddingTop: "9px" }}
                                sx={{ display: "flex" }}
                                type="datetime-local"
                                {...register("treatmentDt")}
                                onChange={(e) => {
                                    console.log(e.target.value); // 選択された日時を確認
                                    setValue("treatmentDt", e.target.value); // 値をフォームにセット
                                    onSubmit(); // 値変更後にフォーム送信
                                }}
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 size={2}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="prefectureId">地域</InputLabel>
                            <Select labelId="prefectureId"
                                id="prefectureId"
                                value={selectedPrefecture}
                                onChange={(e) => {
                                    setValue("prefectureId", e.target.value)
                                    onSubmit()
                                }}

                                displayEmpty>
                                {prefectures.map(prefecture => <MenuItem key={prefecture.id} value={prefecture.id}>{prefecture.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={3}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="genderId">性別</InputLabel>
                            <Select id="genderId"
                                labelId="genderId"
                                value={selectedGender}
                                onChange={(e) => {
                                    setValue("genderId", e.target.value)
                                    onSubmit()
                                }
                                }
                                displayEmpty
                            >
                                {genders.map(gender => <MenuItem key={gender.id} value={gender.id}>{gender.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={3}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="menuId">メニュー</InputLabel>
                            <Select labelId="menuId"
                                id="menuId"
                                value={selectedMenuId}
                                onChange={(e) => {
                                    onSubmit()
                                }}
                                displayEmpty>
                                {menus.map(menu => <MenuItem key={menu.id} value={menu.id}>{menu.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={8} sx={{ display: "flex", alignItems: "center", verticalAlign: "center" }}>
                        <FormControl fullWidth>
                            <TextField
                                {...register("freeWord")}
                                size="medium"
                                placeholder="フリーワード"
                                id="freeWord"
                                onChange={() => onSubmit()}
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 size={4}>
                        <FormControl fullWidth>
                            <Button variant="outlined" onClick={() => {
                                reset({
                                    treatmentDt: null, // DateTimePicker の値をリセット
                                    prefectureId: "",
                                    genderId: "",
                                    menuId: "",
                                    freeWord: "",
                                })
                                onSubmit()
                            }}>リセット</Button>
                        </FormControl>
                    </Grid2>
                </Grid2>

            </form>
        </Box >
    );
}