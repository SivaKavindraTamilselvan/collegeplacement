import { Fragment } from "react";
import { OwnerNavbar } from "../../components/NavBar/ownernavbar";
import { OwnerApplicationList } from "./appli";
export const ApplyJob = () => {
    return (
        <Fragment>
            <OwnerNavbar />
            <OwnerApplicationList />
        </Fragment>
    )
}