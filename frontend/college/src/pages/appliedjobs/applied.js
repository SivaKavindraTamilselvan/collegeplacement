import { Fragment } from "react";
import { ApplicationList } from "./jobs";
import { Navbar } from "../../components/NavBar/navbar";
export const Apply = () => {
    return (
        <Fragment>
            <Navbar />
            <ApplicationList />
        </Fragment>
    )
}