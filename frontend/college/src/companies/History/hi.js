import { Fragment } from "react";
import { OwnerNavbar } from "../../components/NavBar/ownernavbar";
import { History } from "./history";
export const Hist = () => {
    return (
        <Fragment>
            <OwnerNavbar />
            <History/>
        </Fragment>
    )
}