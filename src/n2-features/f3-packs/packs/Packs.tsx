import React, {useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Pagination,
    Paper,
    Slider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SearchIcon from '@mui/icons-material/Search';
import s from './Packs.module.css';
import {useAppDispatch, useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {setPacksTC} from "../../../n1-main/m2-bll/reducers/packs-reducer";
import {NavLink} from "react-router-dom";

function valuetext(value: number) {
    return `${value}°C`;
}

const minDistance = 1;

const Packs = () => {


    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setPacksTC({user_id: "63276c0a9db0ab00041c87a4"}))
    }, [])


    const [searchValue, setSearchValue] = useState<string>('');

    const [value2, setValue2] = React.useState<number[]>([20, 37]);
    const handleChange2 = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue2([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue2([clamped - minDistance, clamped]);
            }
        } else {
            setValue2(newValue as number[]);
        }
    };

    function createData(
        packId: string,
        name: string,
        cards: number,
        lastUpdated: string,
        createdBy: string,
        actions: { learn: boolean, update?: boolean, delete?: boolean },
    ) {
        return {packId, name, cards, lastUpdated, createdBy, actions};
    }

    let packs = useAppSelector(state => state.packs.cardPacks)
    const rows = packs.map(m => {
        return createData(m._id, m.name, m.cardsCount, m.updated, m.created,
            m.user_id ? {learn: true, update: true, delete: true} : {learn: true})
    })


    return <Container maxWidth="lg">
        <Grid container spacing={2} marginTop={'8px'}>
            <Grid item xs={9}>
                <h2>Packs list</h2>
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained">Add new pack</Button>
            </Grid>
        </Grid>
        <Grid container spacing={4}>
            <Grid item xs={5}>
                <div><b>Search</b></div>
                <FormControl fullWidth sx={{m: 1}} variant="outlined">
                    <InputLabel htmlFor="input-search">Provide your text</InputLabel>

                    <OutlinedInput
                        id="input-search"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue((e.currentTarget.value))
                        }}
                        startAdornment={<InputAdornment position="start"><SearchIcon
                            color="disabled"/></InputAdornment>}
                        label="Provide your text"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <div><b>Show packs cards</b></div>
                <ButtonGroup
                    // disableElevation
                    variant="contained"
                    // aria-label="Disabled elevation buttons"
                >
                    <Button
                        style={{background: 'white', color: 'black'}}
                    >My</Button>
                    <Button
                        className={s.button}
                    >All</Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={3}>
                <div><b>Number of cards</b></div>
                <Slider
                    getAriaLabel={() => 'Minimum distance shift'}
                    value={value2}
                    onChange={handleChange2}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                />
            </Grid>
            <Grid item xs={1}>
                <IconButton aria-label="Example">
                    <FilterAltOffIcon color={'disabled'}/>
                </IconButton>
            </Grid>
        </Grid>
        <Grid container spacing={1} marginTop={'8px'}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead style={{background: '#EFEFEF'}}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Cards</TableCell>
                            <TableCell align="right">Last Updated</TableCell>
                            <TableCell align="right">Created by</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow
                                    hover
                                    key={row.name}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        <NavLink className={s.nav} to={`/cards/${row.packId}`}>
                                            {row.name}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell align="right">{row.cards}</TableCell>
                                    <TableCell align="right">{row.lastUpdated}</TableCell>
                                    <TableCell align="right">{row.createdBy}</TableCell>
                                    <TableCell align="right">l u d</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
        <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>
            <Stack spacing={1}>
                <Pagination count={10} shape="rounded"/>
            </Stack>
        </Grid>

    </Container>
}

export default Packs;

