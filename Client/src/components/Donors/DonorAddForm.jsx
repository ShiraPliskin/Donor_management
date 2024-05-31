import { useState } from "react";

const DonorAddForm = ({ initialFields, onSubmit }) => {
    const [donorDetails, setDonorDetails] = useState(initialFields);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(donorDetails);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
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
                <input type="number" name="num_of_children" value={donorDetails.num_of_children} onChange={handleChange} placeholder="מספר ילדים" noValidate />
            </label>
            <label>
                <input type="text" name="spouse_name" value={donorDetails.spouse_name} onChange={handleChange} placeholder="שם בן הזוג" noValidate />
            </label>
            <label>
                <input type="text" name="address_at_work" value={donorDetails.address_at_work} onChange={handleChange} placeholder="כתובת בעבודה" noValidate />
            </label>
            <label>
                <input type="text" name="introduction_description" value={donorDetails.introduction_description} onChange={handleChange} placeholder="תיאור הכרות" noValidate />
            </label>
            <label>
                <input type="text" name="remarks" value={donorDetails.remarks} onChange={handleChange} placeholder="הערות" noValidate />
            </label>
            <button type="submit">הוסף</button>
        </form>
    );
};

export default DonorAddForm;