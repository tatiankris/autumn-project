import React, {useCallback} from "react";
import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useAppDispatch, useAppSelector} from "../../../../../../n1-main/m1-ui/hooks";
import {searchPacksAC} from "../../../../../../n1-main/m2-bll/reducers/packs-reducer";

export const PackSearch = () => {
    const dispatch = useAppDispatch();

    const search = useAppSelector(state => state.packs.search);

    const searchPacksHandler = useCallback((search: string) => {
        dispatch(searchPacksAC(search))
    }, [dispatch, searchPacksAC])

    return (
        <div>
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
        </div>
    )
}