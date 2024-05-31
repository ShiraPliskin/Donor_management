import { useState, useEffect } from "react";
import { GetRequest } from '../Tools'
import DonorAdd from "./DonorAdd";
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
    }

    const [donorDetails, setDonorDetails] = useState(fields);
    const [donorsToDisplay, setDonorsToDisplay] = useState([]);
    const [commentArea, setCommentArea] = useState("");
    const [minDonationAmount, setMinDonationAmount] = useState("");

    useEffect(() => {
        setCommentArea("");
        console.log(donorsToDisplay)
    }, [donorsToDisplay])

    const handleSubmit = (e) => {
        e.preventDefault();
        let conditions = [];
        for (const [key, value] of Object.entries(donorDetails)) {
            if (value) {
                conditions.push(`${key}=${value}`);
            }
        }
        const queryString = conditions.length > 0 ? `?${conditions.join('&')}` : '';
        GetRequest("donors", queryString, setDonorsToDisplay, setCommentArea);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "minDonationAmount" )
            setMinDonationAmount(value);
        else 
            setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
    }

    return (
        <>
            <DonorAdd fields={fields}/>
            <h3>חיפוש מתקדם</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" name="f_name" value={donorDetails.f_name} onChange={handleChange} placeholder="שם פרטי" noValidate />
                </label>
                <label>
                    <input type="text" name="l_name" value={donorDetails.l_name} onChange={handleChange} placeholder="שם משפחה" noValidate />
                </label>
                <label>
                    <input type="text" name="phone" value={donorDetails.phone} onChange={handleChange} placeholder="טלפון" noValidate />
                </label>
                <label>
                    <input type="email" name="email" value={donorDetails.email} onChange={handleChange} placeholder="כתובת מייל" noValidate />
                </label>
                <label>
                    <input type="text" name="address" value={donorDetails.address} onChange={handleChange} placeholder="כתובת" noValidate />
                </label>
                <label>
                    <input type="text" name="minDonationAmount" value={minDonationAmount} onChange={handleChange} placeholder="גובה תרומה מינימלי" noValidate />
                </label>

                <button type="submit">חפש</button>

                {<p>{commentArea}</p>}
            </form>

            {/* {renderTable()} */}

            {donorsToDisplay.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>שם פרטי</th>
                            <th>שם משפחה</th>
                            <th>כתובת מייל</th>
                            <th>טלפון</th>
                            <th>כתובת</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donorsToDisplay.map((donor, index) => (
                            <tr key={index}>
                                <td>{donor.f_name}</td>
                                <td>{donor.l_name}</td>
                                <td>{donor.email}</td>
                                <td>{donor.phone}</td>
                                <td>{donor.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};
export default Donors;