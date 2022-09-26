import React, {useEffect} from 'react';
import {getCardsTC} from "../../n1-main/m2-bll/reducers/cards-reducer";
import {useAppDispatch, useAppSelector} from "../../n1-main/m1-ui/hooks";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import s from "../f1-auth/a3-profile/Profile.module.css";
import {NavLink} from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {PROFILE} from "../../n1-main/m1-ui/routing/Routing";

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


type Order = 'asc' | 'desc';

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'question',
        numeric: false,
        disablePadding: true,
        label: 'Question',
    },
    {
        id: 'answer',
        numeric: true,
        disablePadding: false,
        label: 'Answer',
    },
    {
        id: 'lastUpdated',
        numeric: true,
        disablePadding: false,
        label: 'Last Updated',
    },
    {
        id: 'grade',
        numeric: true,
        disablePadding: false,
        label: 'Grade',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const dispatch = useAppDispatch()
    const {order, orderBy,onRequestSort} = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property)
            dispatch((getCardsTC({
                cardsPack_id: "629fa8c5f0ffde100d74e176",
                sortCards:order==="asc"?`0${property}`
                    :`1${property}`})))
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export function CardsPage() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('answer');
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: "629fa8c5f0ffde100d74e176"}))
    }, [])
    const cards = useAppSelector(state => state.cards)
    const rows = cards.cards.map(el => {
       return  createData(el.question, el.answer, el.updated.slice(0,10), el.grade)
    })

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <Box sx={{width: '100%'}}>
            <div className={s.backToPacks}>
                <NavLink to={PROFILE}> <KeyboardBackspaceIcon sx={{position: 'relative', top: '6px'}}/> Back to Packs
                    List</NavLink>
            </div>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.question}
                                            </TableCell>
                                            <TableCell align="right">{row.answer}</TableCell>
                                            <TableCell align="right">{row.lastUpdated}</TableCell>
                                            <TableCell align="right">{row.grade}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
