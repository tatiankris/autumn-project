import React, {useCallback} from "react";
import {Button, ButtonGroup} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../../n1-main/m1-ui/hooks";
import {setMyPacksToPageAC} from "../../../../../../n1-main/m2-bll/reducers/packs-reducer";

export const MyAllPacksFilter = () => {

    const dispatch = useAppDispatch();
    const isMyId = useAppSelector(state => state.packs.isMyId);
    const setMyPacksHandler = useCallback((isMyPack: boolean) => {
        dispatch(setMyPacksToPageAC(isMyPack))
    }, [dispatch, setMyPacksToPageAC])

    return (
        <div>
            <div><b>Show packs cards</b></div>
            <ButtonGroup
                variant="contained"
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
        </div>
    )
}