import React from 'react'
import { Fragment } from 'react'
import { Homeuser } from './homeuser'
import { Navbar } from '../../components/NavBar/navbar'
export const Home = () => {
    return (
        <Fragment>
            <Navbar/>
            <Homeuser />
        </Fragment>
    )
}
