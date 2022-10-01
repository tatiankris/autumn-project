import React, {ChangeEvent, useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputAdornment, InputBase,
    InputLabel, MenuItem,
    OutlinedInput,
    Pagination,
    Paper, Select, SelectChangeEvent,
    Slider,
    Stack, styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import SearchIcon from '@mui/icons-material/Search';
import {useAppDispatch, useAppSelector, useDebounce} from "../../../n1-main/m1-ui/hooks";
import {
    changePacksPageAC,
    createPackTC,
    deletePackTC, resetAllPacksFilterAC,
    searchPacksAC, setMyPacksToPageAC, setPacksCountAC, setPacksPageCountAC,
    setPacksTC, setSortPacksAC,
    updatePackTC
} from "../../../n1-main/m2-bll/reducers/packs-reducer";
import SchoolIcon from '@mui/icons-material/School';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import s from './Packs.module.css';
import {NavLink} from "react-router-dom";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 15,
        padding: '2px 2px 2px 5px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

const Packs = () => {
    const dispatch = useAppDispatch();

    const myId = useAppSelector(state => state.profile._id);
    const isMyId = useAppSelector(state => state.packs.isMyId);
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);
    const page = useAppSelector(state => state.packs.page)
    const search = useAppSelector(state => state.packs.search);
    const debounceSearchValue = useDebounce<string>(search, 700);
    const [value, setValue] = useState<number[]>([0, 110]);
    const debounceValue = useDebounce(value, 700);

    useEffect(() => {
        dispatch(setPacksCountAC(value))
        dispatch(setPacksTC())
    }, [debounceSearchValue, page, isMyId, debounceValue])


    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - 1), value[1]]);
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + 1)]);
        }
    };

    function valuetext(value: number) {
        return `${value}°C`;
    }

    function createData(
        packId: string,
        name: string,
        user_id: string,
        user_name: string,
        cards: number,
        lastUpdated: string,
        createdBy: string,
    ) {
        return {packId, name, user_id, user_name, cards, lastUpdated, createdBy};
    }

    let packs = useAppSelector(state => state.packs.cardPacks)
    const rows = packs.map(m => {
        return createData(m._id, m.name, m.user_id, m.user_name, m.cardsCount, m.updated, m.created)
    })

    const updatePack = (packId: string, name: string) => {
        dispatch(updatePackTC({_id: packId, name}))
    }
    const searchPacksHandler = (search: string) => {
        dispatch(searchPacksAC(search))
    }
    const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
        dispatch(changePacksPageAC(page))
    }
    const setMyPacksHandler = (isMyPack: boolean) => {
        dispatch(setMyPacksToPageAC(isMyPack))
    }
    const resetAllFilter = () => {
        dispatch(resetAllPacksFilterAC())
    }

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

    const pageCount = useAppSelector(state => state.packs.pageCount)

    const handleChangePageCount = (event: SelectChangeEvent<any>) => {
        dispatch(setPacksPageCountAC(event.target.value));
        dispatch(setPacksTC());

    };

    return <Container maxWidth="lg">
        <Grid container spacing={2} marginTop={'8px'}>
            <Grid item xs={9}>
                <h2>Packs list</h2>
            </Grid>
            <Grid item xs={3}>
                <Button variant="contained" onClick={() => dispatch(createPackTC({name: 'new pack from Minsk'}))}>
                    Add new pack
                </Button>
            </Grid>
        </Grid>
        <Grid container spacing={4}>
            <Grid item xs={5}>
                <div><b>Search</b></div>
                <FormControl fullWidth sx={{m: 1}} variant="outlined">
                    <InputLabel htmlFor="input-search">Provide your text</InputLabel>

                    <OutlinedInput
                        id="input-search"
                        value={search}
                        onChange={(e) => {
                            searchPacksHandler((e.currentTarget.value))
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
                        onClick={() => setMyPacksHandler(true)}
                        color={isMyId ? 'primary' : 'inherit'}
                    >My</Button>
                    <Button
                        onClick={() => setMyPacksHandler(false)}
                        color={!isMyId ? 'primary' : 'inherit'}
                    >All</Button>
                </ButtonGroup>
            </Grid>
            <Grid item xs={3}>
                <div><b>Number of cards</b></div>
                <Slider
                    getAriaLabel={() => 'Minimum distance shift'}
                    value={value}
                    max={110}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                />
            </Grid>
            <Grid item xs={1}>
                <IconButton
                    aria-label="Example"
                    onClick={resetAllFilter}>
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
                            <TableCell align="right">Last Updated<IconButton onClick={onSortHandler}><ArrowDropDownIcon/></IconButton></TableCell>
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
                                    sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: 'pointer'}}>
                                    <TableCell component="th" scope="row">
                                        <NavLink className={s.nav} to={`/cards/${row.packId}`}>
                                            {row.name}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell align="right">{row.cards}</TableCell>
                                    <TableCell align="right">{day + '.' + month + '.' + year}</TableCell>
                                    <TableCell align="right">{row.user_name}</TableCell>
                                    <TableCell align="right">
                                        <IconButton>
                                            <SchoolIcon
                                                fontSize="small"/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => updatePack(row.packId, 'rename pack from Minsk')}
                                            sx={{visibility: (row.user_id !== myId) ? 'hidden' : 'visible'}}>
                                            <DriveFileRenameOutlineIcon
                                                fontSize="small"/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => dispatch(deletePackTC(row.packId))}
                                            sx={{visibility: (row.user_id !== myId) ? 'hidden' : 'visible'}}>
                                            <DeleteIcon
                                                fontSize="small"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            { search && rows.length < 1 && <div style={{marginTop: '20px'}}><span>There are no packs with this name...</span></div>}
            { !search && rows.length < 1 && <div style={{marginTop: '20px'}}><span>Packs not found...</span></div>}
        </Grid>
        <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>
            <Stack direction="row" spacing={2} alignItems="center" textAlign={'center'}>
                <Pagination
                    count={Math.ceil(cardPacksTotalCount / 8)}
                    onChange={changePageHandler}
                    shape="rounded"/>
                <div>
                    Show
                        <Select
                            id="page-count-select"
                            value={pageCount}
                            onChange={handleChangePageCount}
                            size={"small"}
                            style={{marginLeft:"6px", marginRight: "6px"}}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={14}>14</MenuItem>
                            <MenuItem value={16}>16</MenuItem>
                        </Select>
                Cards per Page
                </div>
            </Stack>
        </Grid>
    </Container>
}

export default Packs;

