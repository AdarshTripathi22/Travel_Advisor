import React, { useState, useEffect } from "react";

import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";

import { getPlacesData, getWeatherData } from "./api";

const App = ()=> {

    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [childClicked, setchildClicked] = useState(null);

    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");
    const [filteredPlaces, setfilteredPlaces] = useState([])

    const [isLoading, setisLoading] = useState(false);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
            setCoordinates({lat: latitude, lng: longitude});
        })
    },[]);

    useEffect(()=>{
        const filteredPlaces = places.filter((place) => ( place.rating > rating))

        setfilteredPlaces(filteredPlaces);
    },[rating]);
    
    useEffect(()=> {
        if(bounds.sw && bounds.ne) {
            setisLoading(true);

            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data)=>{
                    setWeatherData(data);
                })

            getPlacesData(type, bounds.sw, bounds.ne)
                .then((data) => {
                    setPlaces(data && data.filter((place)=>(place.name && place.num_reviews>0)));
                    setfilteredPlaces([]);
                    setisLoading(false);
                })
        }
    }, [type, bounds]);

    return (
        <>
            <CssBaseline />
            <Header 
                setCoordinates={setCoordinates}
            /><br/><br/><br/>
            <Grid container spacing = {4} style = {{width: "100%"}}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={filteredPlaces.length ? filteredPlaces : places} 
                        childClicked = {childClicked}
                        isLoading={isLoading}
                        type={type} setType={setType}
                        rating={rating} setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        coordinates = {coordinates}
                        setCoordinates = {setCoordinates}
                        setBounds = {setBounds}
                        places = {filteredPlaces.length ? filteredPlaces : places}
                        setchildClicked = {setchildClicked}
                        weatherData = {weatherData}
                    />
                </Grid>
            </Grid>
        </>
    )
};

export default App;

// sw:{lat: '19.2365132435', lng: '73.1169775844'}, ne:{lat: '19.270869957481', lng: '73.165729415527'}