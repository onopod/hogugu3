import { Button, FormControl, Stack, TextField } from "@mui/material";

export default function Profile({ handleSubmit, onSubmit, register }) {
    return (
        <Stack spacing={1}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Stack spacing={1}>
                        名前：<TextField id="name" {...register("name")} />
                        メールアドレス：<TextField id="mail" {...register("mail")} />
                        <Button type="submit">更新</Button>
                    </Stack>
                </FormControl>
            </form>
        </Stack>
    );
}