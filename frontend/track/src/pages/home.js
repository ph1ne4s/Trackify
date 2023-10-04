import React, {useEffect, useState} from 'react'
// import {getProducts} from "../functions/product";
import Jumbotron from "../components/Jumbotron";

const  Home = () => {

    return(
        <>
        
            <div className={"jumbotron text-danger h1 font-weight-bold text-center"}>
                <Jumbotron text={['Trackify','Made With Love By', 'Aviral & Avi']}/>
            </div>

        </>
    );
};

export default Home;