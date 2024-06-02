// import { useState, useEffect } from "react";
// import DonorForm from "./DonorForm";

// const DonorAdd = (fields) => {

//     const [donorDetails, setDonorDetails] = useState("");
//     const [displayAddForm, setDisplayAddForm] = useState(false);
//     const [commentArea, setCommentArea] = useState("");

//     useEffect(() => {
//         setDonorDetails(fields);
//     }, [])

//     const handleSubmit = (e) => {
//         e.preventDefault();
    
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
//     }

//     return(
//         <>
//         <button onClick={()=>setDisplayAddForm((prev) => !prev)}>הוספת תורם</button>
//         {displayAddForm && (
//             <form onSubmit={handleSubmit}>
//             <label>
//                 <input type="text" name="f_name" value={donorDetails.f_name} onChange={handleChange} placeholder="שם פרטי" noValidate />
//             </label>
//             <label>
//                 <input type="text" name="l_name" value={donorDetails.l_name} onChange={handleChange} placeholder="שם משפחה" noValidate />
//             </label>
//             <label>
//                     <input type="text" name="phone" value={donorDetails.phone} onChange={handleChange} placeholder="טלפון" noValidate />
//             </label>
//             <label>
//                 <input type="email" name="email" value={donorDetails.email} onChange={handleChange} placeholder="כתובת מייל" noValidate />
//             </label>
//             <label>
//                 <input type="text" name="address" value={donorDetails.address} onChange={handleChange} placeholder="כתובת" noValidate />
//             </label>
//             <label>
//                 <input type="number" name="num_of_children" value={donorDetails.num_of_children} onChange={handleChange} placeholder="מספר ילדים" noValidate />
//             </label>
//             <label>
//                 <input type="text" name="spouse_name" value={donorDetails.spouse_name} onChange={handleChange} placeholder="שם בן הזוג" noValidate />
//             </label>
//             <label>
//                 <input type="text" name="address_at_work" value={donorDetails.address_at_work} onChange={handleChange} placeholder="כתובת בעבודה" noValidate />
//             </label>
//             <label>
//                 <input type="text" name="introduction_description" value={donorDetails.introduction_description} onChange={handleChange} placeholder="תיאור הכרות" noValidate />
//             </label>

//             {/* contact_id */}
//             <label>
//                 <input type="text" name="remarks" value={donorDetails.remarks} onChange={handleChange} placeholder="הערות" noValidate />
//             </label>

//             <button type="submit">הוסף</button>

//             {<p>{commentArea}</p>}
//         </form>
//         )}
//         </>
//     )
// }
// export default DonorAdd;

import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import DonorForm from "./DonorForm";

const DonorAdd = ({ fields }) => {
    const [donorDetails, setDonorDetails] = useState({});
    const [open, setOpen] = useState(false);
    const [commentArea, setCommentArea] = useState("");

    useEffect(() => {
        setDonorDetails(fields);
    }, [fields]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your submit logic here
        setCommentArea("Donor added successfully");
        handleClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonorDetails((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                הוספת תורם
            </Button>
            <DonorForm donorDetails={donorDetails} handleChange={handleChange} handleSubmit={handleSubmit} open={open} handleClose={handleClose} />
           
            {commentArea && <p>{commentArea}</p>}
        </>
    );
};

export default DonorAdd;