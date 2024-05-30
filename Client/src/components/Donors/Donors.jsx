import { useState, useEffect } from "react";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
    }
    
    return (
        <>
            <h3>חיפוש מתקדם</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" name="f_name" value={donorDetails.f_name} onChange={handleChange} placeholder="שם פרטי" required noValidate />
                </label>
                <label>
                    <input type="text" name="l_name" value={donorDetails.l_name} onChange={handleChange} placeholder="שם משפחה" required noValidate />
                </label>
                <label>
                    <input type="email" name="email" value={donorDetails.email} onChange={handleChange} placeholder="כתובת מייל" required noValidate />
                </label>
                <label>
                    <input type="text" name="city" value={donorDetails.city} onChange={handleChange} placeholder="עיר" required noValidate />
                </label>
                <label>
                    <input type="text" name="country" value={donorDetails.country} onChange={handleChange} placeholder="מדינה" required noValidate />
                </label>
                <label>
                    <input type="text" name="minDonationAmount" value={donorDetails.minDonationAmount} onChange={handleChange} placeholder="גובה תרומה מינימלי" required noValidate />
                </label>

                <button type="submit">חפש</button>
            </form>
        </>
    )
}
export default Donors;