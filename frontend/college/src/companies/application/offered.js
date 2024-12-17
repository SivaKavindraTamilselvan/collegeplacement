import { Fragment } from "react";
import { OwnerNavbar } from "../../components/NavBar/ownernavbar";
import { OwnerOfferList } from "./offer";
export const ApplyOffer = () => {
    return (
        <Fragment>
            <OwnerNavbar />
            <OwnerOfferList/>
        </Fragment>
    )
}