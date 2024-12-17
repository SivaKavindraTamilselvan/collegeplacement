import { Fragment } from "react";
import { CompanyJobList } from "./listc";
import { PlacementNavbar } from "../../components/NavBar/placementnavbar";
export const PList = () => {
    return (
        <Fragment>
            <PlacementNavbar/>
            <CompanyJobList />
        </Fragment>
    )
}