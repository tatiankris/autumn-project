import React from "react";
import {Grid} from "@mui/material";
import {PacksSearchParams} from "./PacksSearchParams/PacksSearchParams";
import {AddNewPackModal} from "../../PackModals/AddNewPackModal";


export const PacksPageHead = () => {

    return (
        <div>
            <Grid container spacing={2} marginTop={'8px'}>
                <Grid item xs={9}>
                    <h2>Packs list</h2>
                </Grid>
                <Grid item xs={3}>
                    <AddNewPackModal />
                </Grid>
            </Grid>
            <PacksSearchParams />
        </div>
    )
}