import { useState, useEffect } from "react";
import { GetRequest } from '../Tools'
const Donors = () => {

    const fields = {
        f_name: '',
        l_name: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        minDonationAmount: ''
    }

    const [donorDetails, setDonorDetails] = useState(fields);
    const [donorsToDisplay, setDonorsToDisplay] = useState([]);
    const [commentArea, setCommentArea] = useState("");

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
        setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
    }

    const renderTable = () => {
        if (donorsToDisplay.length === 0) {
            return;
        }

        const headers = Object.keys(donorsToDisplay[0]);

        return (
            <table>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {donorsToDisplay.map((donor, index) => (
                        <tr key={index}>
                            {headers.map((header, idx) => (
                                <td key={idx}>{donor[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <>
            <h3>חיפוש מתקדם</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" name="f_name" value={donorDetails.f_name} onChange={handleChange} placeholder="שם פרטי" noValidate />
                </label>
                <label>
                    <input type="text" name="l_name" value={donorDetails.l_name} onChange={handleChange} placeholder="שם משפחה" noValidate />
                </label>
                <label>
                    <input type="email" name="email" value={donorDetails.email} onChange={handleChange} placeholder="כתובת מייל" noValidate />
                </label>
                <label>
                    <input type="text" name="city" value={donorDetails.city} onChange={handleChange} placeholder="עיר" noValidate />
                </label>
                <label>
                    <input type="text" name="country" value={donorDetails.country} onChange={handleChange} placeholder="מדינה" noValidate />
                </label>
                <label>
                    <input type="text" name="minDonationAmount" value={donorDetails.minDonationAmount} onChange={handleChange} placeholder="גובה תרומה מינימלי" noValidate />
                </label>

                <button type="submit">חפש</button>

                {<p>{commentArea}</p>}
                {renderTable()}

            </form>
        </>
    )
}
export default Donors;