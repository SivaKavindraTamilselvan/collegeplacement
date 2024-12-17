import { Fragment } from "react";
import { CompanyJobList } from "./listc";
import { Navbar } from "../../components/NavBar/navbar";
export const List = () => {
    return (
        <Fragment>
            <Navbar />
            <CompanyJobList />
        </Fragment>
    )
}