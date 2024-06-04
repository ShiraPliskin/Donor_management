import { useState, useEffect } from "react";
import DonorAdd from "./DonorAdd";
import DonorSearch from "./DonorSearch";
import DonorsDisplay from "./DonorsDisplay";

const Donors = () => {

    const fields = {
        id: '',
        f_name: '',
        l_name: '',
        email: '',
        phone: '',
        address: '',
        num_of_children: '',
        spouse_name: '',
        address_at_work: '',
        introduction_description: '',
        contact_id: '',
        remarks: '',
    };

    const [donorsToDisplay, setDonorsToDisplay] = useState([]);

    return (
        <>
            <DonorAdd fields={fields} />
            <DonorSearch fields={fields} donorsToDisplay={donorsToDisplay} setDonorsToDisplay={setDonorsToDisplay}/>
            <DonorsDisplay donorsToDisplay={donorsToDisplay} setDonorsToDisplay={setDonorsToDisplay}/>
        </>
    );
};

export default Donors;
