import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../../n1-main/m1-ui/hooks";
import {Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {NavLink, useNavigate} from "react-router-dom";
import s from "../../Packs.module.css";
import SchoolIcon from "@mui/icons-material/School";
import {EditPackModal} from "../../PackModals/EditPackModal";
import {DeletePackModal} from "../../PackModals/DeletePackModal";
import {setPacksTC, setSortPacksAC} from "../../../../../n1-main/m2-bll/reducers/packs-reducer";

export const PacksPageTable = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const packs = useAppSelector(state => state.packs.cardPacks)
    const search = useAppSelector(state => state.packs.search);

    function createData(
        packId: string,
        name: string,
        user_id: string,
        user_name: string,
        cards: number,
        lastUpdated: string,
        createdBy: string,
        private_: boolean
    ) {
        return {packId, name, user_id, user_name, cards, lastUpdated, createdBy, private_};
    }
    const rows = packs.map(m => {
        return createData(m._id, m.name, m.user_id, m.user_name, m.cardsCount, m.updated, m.created, m.private)
    })

    const [sort, setSort] = useState<string>('')
    const onSortHandler = () => {
        if (sort === '') {
            setSort('1updated')
        } else {
            setSort('')
        }
        dispatch(setSortPacksAC(sort))
        dispatch(setPacksTC())
    }
    const learnPackHandler = (packId: string) => {
        navigate(`/learn/${packId}`)
    }

    return (
        <Grid container spacing={1} marginTop={'8px'}>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead style={{background: '#EFEFEF'}}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Cards</TableCell>
                            <TableCell align="right">Last Updated<IconButton
                                onClick={onSortHandler}><ArrowDropDownIcon/></IconButton></TableCell>
                            <TableCell align="right">Created by</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {

                            let day = row.lastUpdated.slice(8, 10)
                            let month = row.lastUpdated.slice(5, 7)
                            let year = row.lastUpdated.slice(0, 4)

                            return (
                                <TableRow
                                    hover
                                    key={row.packId}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        <NavLink className={s.nav} to={`/cards/${row.packId}`}>
                                            {row.name}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell align="right">{row.cards}</TableCell>
                                    <TableCell align="right">{day + '.' + month + '.' + year}</TableCell>
                                    <TableCell align="right">{row.user_name}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={() => learnPackHandler(row.packId)}
                                            disabled={row.cards === 0}>
                                            <SchoolIcon
                                                fontSize="small"/>
                                        </IconButton>
                                        <EditPackModal page={'packs'} userId={row.user_id} id={row.packId} name={row.name}
                                                       private_={row.private_}/>
                                        <DeletePackModal page={'packs'} userId={row.user_id} id={row.packId} name={row.name}/>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {search && rows.length < 1 &&
                <div style={{marginTop: '20px'}}><span>There are no packs with this name...</span></div>}
            {!search && rows.length < 1 && <div style={{marginTop: '20px'}}><span>Packs not found...</span></div>}
        </Grid>
    )
}