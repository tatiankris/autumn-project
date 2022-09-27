import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "../../n1-main/m1-ui/hooks";
import {getCardsTC} from "../../n1-main/m2-bll/reducers/cards-reducer";
import {
    Button,
    Container,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Pagination,
    Stack
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {NavLink} from "react-router-dom";
import {PACKS} from "../../n1-main/m1-ui/routing/Routing";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import s from "./CardsPage.module.css"


interface Data {
    question: string;
    answer: string;
    lastUpdated: string;
    grade: number;
}

function createData(
    question: string,
    answer: string,
    lastUpdated: string,
    grade: number,
): Data {
    return {
        question,
        answer,
        lastUpdated,
        grade,
    };
}

export function CardsPage() {
    const [searchValue, setSearchValue] = useState<string>('');
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards)
    // useEffect(() => {
    //     cards.cards.length &&
    //     dispatch(getCardsTC({cardsPack_id:cards.cards[0].cardsPack_id}))
    // }, [])
    const rows = cards.cards.map(el => {
        return createData(el.question, el.answer, el.updated.slice(0, 10), el.grade)
    })
    return (
        <Container maxWidth="lg">
            <div className={s.backToPacks}>
                <NavLink to={PACKS}> <KeyboardBackspaceIcon sx={{position: 'relative', top: '6px'}}/> Back to Packs
                    List</NavLink>
            </div>
            <Grid container spacing={3} marginTop={'8px'}>
                <Grid item xs={10}>
                    <div className={s.packName}>Pack name</div>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained">Learn pack</Button>
                </Grid>
                <Grid item xs={12}>
                    <div className={s.search}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="input-search">Provide your text</InputLabel>
                            <OutlinedInput
                                placeholder={"search"}
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
                    </div>
                </Grid>

            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Questions</TableCell>
                            <TableCell align="left">Answers</TableCell>
                            <TableCell align="left">Last updated</TableCell>
                            <TableCell align="left">grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                hover
                                key={row.lastUpdated}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" width={"30%"}>{row.question}</TableCell>
                                <TableCell align="left" width={"50%"}>{row.answer}</TableCell>
                                <TableCell align="left" width={"10%"}>{row.lastUpdated}</TableCell>
                                <TableCell align="left" width={"10%"}>{row.grade}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>
                <Stack spacing={1}>
                    <Pagination count={10} shape="rounded"/>
                </Stack>
            </Grid>
        </Container>
    );
}
