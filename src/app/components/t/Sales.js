"use client"

import { getSales } from "@/app/actions";
import { Divider, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select } from "@mui/material";
import { format, subMonths } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


export default function Sales() {
    const targetYMs = [...Array(6).keys()].reverse().map(i => {
        return {
            id: format(subMonths(new Date(), i), "yyyy-MM"),
            name: format(subMonths(new Date(), i), "yyyy年M月")
        }
    })
    const [sales, setSales] = useState([])
    const { setValue, getValues, watch } = useForm({
        defaultValues: {
            targetYM: targetYMs.reverse()[0].id
        }
    })
    const selectedTargetYM = watch("targetYM")

    const fetchSales = async () => {
        const currentSales = await getSales({
            targetYM: getValues("targetYM")
        })
        setSales(currentSales)
    }
    useEffect(() => {
        fetchSales();
        // eslint-disable-next-line
    }, [])

    const salesFormat = () => {
        if (!(sales?.length > 0)) return "";
        const salesAmount = sales.map(s => s.therapistMenu.price).reduce((x, y) => x + y, 0)
        const serviceFee = (salesAmount * 0.3).toFixed(0)
        const netAmount = salesAmount - serviceFee
        return `売上額：${salesAmount.toLocaleString()}円 手数料：${serviceFee.toLocaleString()}円 差引額：${netAmount.toLocaleString()}円`
    }

    return (
        <>
            <FormControl variant="standard" fullWidth>
                <InputLabel id="targetYM">対象年月</InputLabel>
                <Select labelId="targetYM"
                    id="targetYM"
                    value={selectedTargetYM}
                    onChange={(e) => {
                        setValue("targetYM", e.target.value)
                        fetchSales()
                    }}

                    displayEmpty>
                    {targetYMs.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
                </Select>
            </FormControl>

            <List>
                {sales?.length > 0 && sales.map(s => (
                    <ListItem key={s.id}>
                        <ListItemText primary={
                            `${format(new Date(s.startDt), "yyyy/MM/dd kk:mm")}`
                        }
                            secondary={
                                `${s.therapistMenu.menu.name} ${s.therapistMenu.treatmentTime}分 ${s.user.name}`
                            } />
                        {s.therapistMenu.price.toLocaleString()}円
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List key="total">
                <ListItem key="total">
                    <ListItemText primary={salesFormat()} />
                </ListItem>
            </List>
        </>
    )

}