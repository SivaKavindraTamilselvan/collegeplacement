import { Fragment } from "react";
import { OwnerNavbar } from "../../components/NavBar/ownernavbar";
import { InterviewApplicationList } from "./interview";
export const ApplyInterviewOwner = () => {
    return (
        <Fragment>
            <OwnerNavbar />
            <InterviewApplicationList/>
        </Fragment>
    )
}