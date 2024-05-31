// import { useState, useEffect } from "react";
// import DonorAddForm from "./DonorAddForm";

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

import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import DonorAddForm from "./DonorAddForm";

const DonorAdd = (fields) => {
    const [commentArea, setCommentArea] = useState("");

    const handleSubmit = (newDonorDetails) => {
        console.log("Form submitted:", newDonorDetails);
        setCommentArea("Donor added successfully");
        window.close(); // Close the form window after submission
    };

    const openFormWindow = () => {
        const formWindow = window.open(
            "",
            "_blank",
            "width=600,height=600"
        );

        formWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Donor Form</title>
            </head>
            <body>
                <div id="form-root"></div>
            </body>
            </html>
        `);

        formWindow.document.close();

        // Ensure React and ReactDOM are available in the new window
        formWindow.React = React;
        formWindow.ReactDOM = ReactDOM;

        // Use createRoot instead of ReactDOM.render
        const root = formWindow.ReactDOM.createRoot(formWindow.document.getElementById("form-root"));
        root.render(
            <formWindow.React.StrictMode>
                <DonorAddForm initialFields={fields} onSubmit={handleSubmit} />
            </formWindow.React.StrictMode>
        );
    };

    return (
        <>
            <button onClick={openFormWindow}>הוספת תורם</button>
            {<p>{commentArea}</p>}
        </>
    );
};

export default DonorAdd;
