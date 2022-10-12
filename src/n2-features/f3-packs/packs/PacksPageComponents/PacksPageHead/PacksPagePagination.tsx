import React, {ChangeEvent, useCallback} from 'react'
import {Grid, MenuItem, Pagination, Select, SelectChangeEvent, Stack} from "@mui/material";
import {changePacksPageAC, setPacksPageCountAC, setPacksTC} from "../../../../../n1-main/m2-bll/reducers/packs-reducer";
import {useAppDispatch, useAppSelector} from "../../../../../n1-main/m1-ui/hooks";
import {BootstrapInput} from "../../../../../n1-main/m1-ui/common/BootstrapInput";

export const PacksPagePagination = () => {

    const dispatch = useAppDispatch();
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount);

    const changePageHandler = useCallback((event: ChangeEvent<unknown>, page: number) => {
        dispatch(changePacksPageAC(page))
    }, [dispatch, changePacksPageAC])

    const handleChangePageCount = useCallback((event: SelectChangeEvent<any>) => {
        dispatch(setPacksPageCountAC(event.target.value));
        dispatch(setPacksTC());
    }, [dispatch, setPacksPageCountAC, setPacksTC])

    return (
        <Grid container spacing={1} marginTop={'28px'} marginBottom={'46px'}>
            <Stack direction="row" spacing={2} alignItems="center" textAlign={'center'}>
                <Pagination
                    count={Math.ceil(cardPacksTotalCount / pageCount)}
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
    )
}