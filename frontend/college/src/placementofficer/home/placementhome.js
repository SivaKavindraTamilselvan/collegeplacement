import React from 'react'
import { Fragment } from 'react'
import { Home } from './home'
import { PlacementNavbar } from '../../components/NavBar/placementnavbar'
import { BarChart } from '../bar/barchart'
export const PlacementHome = () => {
    return (
        <Fragment>
            <BarChart/>
            <PlacementNavbar/>
            <Home/>
        </Fragment>
    )
}
