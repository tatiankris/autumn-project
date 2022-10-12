import React, {useCallback} from "react";
import {Grid, IconButton} from "@mui/material";
import {PackSearch} from "./PackSearch";
import {MyAllPacksFilter} from "./MyAllPacksFilter";
import {NumberOfCards} from "./NumberOfCards";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {useAppDispatch} from "../../../../../../n1-main/m1-ui/hooks";
import {resetAllPacksFilterTC} from "../../../../../../n1-main/m2-bll/reducers/packs-reducer";

export const PacksSearchParams = () => {
    const dispatch = useAppDispatch();

    const resetAllFilter = useCallback(() => {
        dispatch(resetAllPacksFilterTC())
    }, [dispatch, resetAllPacksFilterTC])

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={5}>
                    <PackSearch/>
                </Grid>
                <Grid item xs={3}>
                    <MyAllPacksFilter/>
                </Grid>
                <Grid item xs={3}>
                    <div><b>Number of cards</b></div>
                    <NumberOfCards/>
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                        aria-label="Example"
                        onClick={resetAllFilter}>
                        <FilterAltOffIcon color={'disabled'}/>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}