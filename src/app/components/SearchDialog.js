import { Box, Button, Chip, FormControl, Grid2, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { addDays, addHours, format } from "date-fns";

export default function SearchDialog({ prefectures, genders, menus, handleSubmit, onSubmit, register, setValue, watch, reset }) {
    const selectedPrefecture = watch("prefectureId");
    const selectedGender = watch("genderId");
    const selectedMenuId = watch("menuId");
    const selectedPriceRange = watch("priceRange")

    const priceRanges = ["-5000", "5000-6000", "6000-7000", "7000-8000", "8000-10000", "10000-13000", "13000-16000", "16000-"]
    return (
        <Box sx={{ my: 1, width: "100%" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={1}>
                    <Grid2 size={4} sx={{

                    }}>
                        <FormControl variant="standard" fullWidth>
                            <Input
                                style={{ paddingTop: "22px", paddingBottom: "3px" }}
                                sx={{ display: "flex" }}
                                type="datetime-local"
                                value={watch("treatmentDt") || ""}
                                {...register("treatmentDt")}
                                onChange={(e) => {
                                    setValue("treatmentDt", e.target.value);
                                    onSubmit();
                                }}
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 size={8} sx={{ pt: 2, pl: 1 }}>
                        <Chip variant="outlined" label="1時間後" clickable onClick={() => {
                            setValue("treatmentDt", format(addHours(new Date(), 1), "yyyy-MM-dd kk:mm"))
                            onSubmit()
                        }} />
                        <Chip sx={{ ml: 1 }} variant="outlined" label="明日" clickable onClick={() => {
                            setValue("treatmentDt", format(addDays(new Date(), 1), "yyyy-MM-dd kk:mm"))
                            onSubmit()
                        }} />
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
                                    setValue("menuId", e.target.value)
                                    onSubmit()
                                }}
                                displayEmpty>
                                {menus.map(menu => <MenuItem key={menu.id} value={menu.id}>{menu.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={4}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="priceRange">価格</InputLabel>
                            <Select labelId="priceRange"
                                id="priceRange"
                                value={selectedPriceRange}
                                onChange={(e) => {
                                    setValue("priceRange", e.target.value)
                                    onSubmit()
                                }}
                                displayEmpty>
                                {priceRanges.map((priceRange, idx) => <MenuItem key={idx} value={priceRange}>{priceRange}</MenuItem>)}
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
                                onChange={(e) => {
                                    setValue("freeWord", e.target.value)
                                    onSubmit()
                                }}
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 size={4}>
                        <FormControl fullWidth>
                            <Button variant="outlined" onClick={() => {
                                reset({
                                    treatmentDt: null,
                                    prefectureId: "",
                                    genderId: "",
                                    menuId: "",
                                    freeWord: "",
                                    priceRange: ""
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