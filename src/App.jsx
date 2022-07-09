import React from "react";

import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";

const App = ()=> {
    return (
        <>
            <CssBaseline />
            <Header /><br/><br/><br/>
            <Grid container spacing = {4} style = {{width: "100%"}}>
                <Grid item xs={12} md={4}>
                    <List />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map />
                </Grid>
            </Grid>
        </>
    )
};

export default App;