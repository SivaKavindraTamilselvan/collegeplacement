import { Fragment } from "react";
import { OwnerNavbar } from "../../components/NavBar/ownernavbar";
import { ScehduleApplicationList } from "./schedule";
export const ApplyScheduled = () => {
    return (
        <Fragment>
            <OwnerNavbar />
            <ScehduleApplicationList/>
        </Fragment>
    )
}