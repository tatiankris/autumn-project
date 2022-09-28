import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {createData} from "../CardsPage";
import {Container, Grid, IconButton, Pagination, Stack} from "@mui/material";
import {BackToPackList} from "../CommonCardsPageComponents/BackToPackList";
import {CardsPageHead} from "../CommonCardsPageComponents/CardsPageHead";
import {CardSearch} from "../CommonCardsPageComponents/CardSearch";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {deleteCardTC, updateCardTC} from "../../../n1-main/m2-bll/reducers/cards-reducer";


export const MyCardsPage = () => {
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards)
    const rows = cards.cards.map(el => {
        return createData(el.question, el.answer, el.updated.slice(0, 10), el.grade, el._id)
    })
    return (
        <Container maxWidth="lg">
            <BackToPackList/>
            <Grid container spacing={3} marginTop={'8px'}>
                <CardsPageHead/>
                <CardSearch/>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead style={{background: '#EFEFEF'}}>
                        <TableRow>
                            <TableCell align="left">Questions</TableCell>
                            <TableCell align="left">Answers</TableCell>
                            <TableCell align="left">Last updated</TableCell>
                            <TableCell align="left">grade</TableCell>
                            <TableCell align="left"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            const deleteCardHandler=()=>{
                                dispatch(deleteCardTC(row._id))
                            }
                            const updateCardHandler=()=>{
                                dispatch(updateCardTC(row._id))
                            }
                            return <TableRow
                                    hover
                                    key={row.lastUpdated}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="left" width={"39%"}>{row.question}</TableCell>
                                    <TableCell align="left" width={"39%"}>{row.answer}</TableCell>
                                    <TableCell align="left" width={"10%"}>{row.lastUpdated}</TableCell>
                                    <TableCell align="left" width={"9%"}>{row.grade}</TableCell>
                                    <TableCell align="left" width={"2%"}>
                                        <Stack direction={"row"} spacing={0}>
                                            <IconButton onClick={updateCardHandler}><BorderColorIcon fontSize={"small"}/></IconButton>
                                            <IconButton onClick={deleteCardHandler}><DeleteOutlineIcon
                                                fontSize={"small"}/></IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            }
                        )}
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
};

