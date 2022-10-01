import React from 'react';
import {Container, Grid, IconButton} from "@mui/material";
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
import {useAppDispatch, useAppSelector} from "../../../n1-main/m1-ui/hooks";
import {createData} from "../CardsPage";
import {MyPagination} from "../CommonCardsPageComponents/MyPagination";
import {setSortAC} from "../../../n1-main/m2-bll/reducers/cards-reducer";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const FriendsCardsPage = () => {
    const dispatch = useAppDispatch()
    const sort= useAppSelector(state => state.cards.sort)
    const cards = useAppSelector(state => state.cards)
    const rows = cards.cards.map(el => {
        return createData(el.question, el.answer, el.updated.slice(0, 10), el.grade, el._id)
    })
    const sortHandler=()=>{
        dispatch(setSortAC())
    }
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
                        <TableRow >
                            <TableCell align="left" >Questions</TableCell>
                            <TableCell align="left">Answers</TableCell>
                            <TableCell align="left" onClick={sortHandler} >
                                <IconButton>{sort==="0updated"?<ArrowDownwardIcon/>:<ArrowUpwardIcon/>}</IconButton> updated</TableCell>
                            <TableCell align="left">grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                hover
                                key={row._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align="left" width={"30%"}>{row.question}</TableCell>
                                <TableCell align="left" width={"45%"}>{row.answer}</TableCell>
                                <TableCell align="center" width={"15%"}>{row.lastUpdated}</TableCell>
                                <TableCell align="left" width={"10%"}>{row.grade}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>
                    <MyPagination/>
            </Grid>
        </Container>
    );
};

