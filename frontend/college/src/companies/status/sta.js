import { Fragment } from "react";
import { ComapanyStatusList } from "./companystatus";
import { OwnerNavbar } from "../../components/NavBar/ownernavbar";

export const CompanyListJob =() =>{
    return(
        <Fragment>
            <OwnerNavbar/>
            <ComapanyStatusList/>
        </Fragment>
    )
}