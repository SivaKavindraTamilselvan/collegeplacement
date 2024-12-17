import { Fragment } from "react";
import { OwnerHomePage } from "./home";
import { OwnerNavbar } from "../../components/NavBar/ownernavbar";
export const OwnerHome =() =>{
    return(
        <Fragment>
            <OwnerNavbar/>
            <OwnerHomePage/>
        </Fragment>
    )
}