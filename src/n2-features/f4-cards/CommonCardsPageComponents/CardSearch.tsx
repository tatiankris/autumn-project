import React, {useState} from 'react';
import s from "../CardsPage.module.css";
import {FormControl, Grid, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const CardSearch = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    return (
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
    );
};

