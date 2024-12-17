// code to add the job to the company

import { Fragment } from "react";
import { Addjob } from "./c";
import { OwnerNavbar } from "../../components/NavBar/ownernavbar";
export const Job =() =>{
    return(
        <Fragment>
            <OwnerNavbar/>
            <Addjob/>
        </Fragment>
    )
}