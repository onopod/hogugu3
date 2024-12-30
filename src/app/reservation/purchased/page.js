import { getPurchasedReservations } from "@/app/actions";
import { AppBar, BottomBar } from "@/app/components";
import { Button, Avatar, Box, Container, Stack, Tab, Tabs, Typography, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import { format } from "date-fns";

export default async function ReservationPage() {

    const purchasedReservations = await getPurchasedReservations()

    const purchasedReservationList = purchasedReservations?.length > 0 ?
        <List>
            {purchasedReservations.map(r => (
                <ListItem key={r.id}>
                    <ListItemAvatar>
                        <Avatar alt={r.therapist.name} src={r.therapist.therapistView.imageFilePath}>
                            {r.therapist.therapistView.name0}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={r.therapist.name} secondary={
                        <Typography component="span" variant="body2" color="textSecondary">
                            {`${format(new Date(r.startDt), "yyyy/MM/dd kk:mm")} から ${r.therapistMenu.treatmentTime} 分 ${r.therapistMenu.price}円`}
                        </Typography>
                    } />
                </ListItem>
            ))}
            <ListItem>
                <ListItemText primary={`合計：${purchasedReservations.map(r => r.therapistMenu.price).reduce((x, y) => x + y, 0)}円`} />
            </ListItem>
        </List>
        : ""
    return (
        <>
            <AppBar />
            <Container maxWidth="sm">
                <Box sx={{ width: "100%" }}>
                    {purchasedReservationList}
                </Box>
            </Container>
            <BottomBar />
        </>
    );
}
