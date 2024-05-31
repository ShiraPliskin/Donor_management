// export const displayObject = (obj, parentKey = '') => {
//     return Object.entries(obj).map(([key, value]) => {
//       const currentKey = parentKey ? `${parentKey}.${key}` : key;
//       if (typeof value === 'object' && value !== null) {
//         return (
//           <li key={currentKey} style={{ listStyle: 'none' }}>
//             <strong>{key}:</strong>
//             <ul>{displayObject(value, currentKey)}</ul>
//           </li>
//         );
//       } else {
//         if (typeof value !== 'boolean') {
//           return (
//             <li key={currentKey} style={{ listStyle: 'none' }}>
//               <strong>{key}: </strong>{value}
//             </li>
//           );
//         }
//       }
//     });
//   };
  

  import { React, useState } from "react";
  import {config} from "./config.jsx";
  export const GetRequest = async (table, conditions, state ,comment ) => {
    const url = `http://${config.SERVERPORT}/${table}${conditions ? `${conditions}` : ''}`;
    console.log(url)
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (Object.keys(data).length === 0) {
        comment(`לא נמצא תורם`);
        return false;
      } else {
        state(data);
        return true;
      }
    } catch (error) {
      console.error("Error in GetRequest:", error);
      comment(`שגיאת שרת`);
      return false;
    }
  };
  
  // export const GetRequest= async (id, state, comment, table)=>
  //  {
  //   console.log("in get reqest")
  //     fetch(`http://${config.SERVERPORT}/${table}/${id}`)
  //         .then(response => {
  //           console.log("after fetch response "+response)
  //             if (!response.status===200) {
  //               console.log("response.status "+response.status)
  //                 throw new Error(`Request failed with status: ${response.status}`);
  //             }
  //             console.log("in get request response.json(): "+response);
  //             return response;
  //         })
  //         .then(data => {
  //           console.log("after json: "+ data)
  //             if (Object.keys(data).length === 0) {
  //                 comment(`there is no ${table} with such id.`)
  //             }
  //             else {
  //               console.log("in get users by id "+data[0]);
  //                 state(data[0]);
  //             }
  //         })
  //         .catch(error => {
  //             comment(`Server error:${error}`)
  //         });
  // }
  
  export const GetAllRequest = async(state, comment, table) => {
    fetch(`http://${config.SERVERPORT}/${table}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Object.keys(data).length === 0) {
                comment(`there is no ${table}s.`)
            }
            else {
                state(data);
            }
        })
        .catch(error => {
            console.error(error);
            comment(`Server error: ${error}.`)
        });
  }
  
  export const UpdateRequest = async (state, comment, updatedObject, table) => {
    fetch(`http://${config.SERVERPORT}/${table}/${updatedObject.id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(updatedObject)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Object.keys(data).length === 0) {
                comment(`there is no ${table} with such id.`)
            }
        })
        .catch(error => {
            console.error(error);
            comment(`Server error:${error}.`)
        });
  }
  export const DeleteRequest =async  (state, comment, id,table) => {
    fetch(`http://${config.SERVERPORT}/${table}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (Object.keys(data).length === 0) {
                comment(`can't delete`);
            }
            else {
                state(data);
            }
        })
        .catch(error => {
            comment(`Server error:${error}.`)
        });
  }
  // export const CreateRequest = async (comment, table, newMember) => {
  //   fetch(`http://${config.SERVERPORT}/${table}`, {
  //       headers: { 'Content-Type': 'application/json' },
  //       method: 'POST',
  //       body: JSON.stringify(newMember)
  //   })
  //       .then(response => {
  //           if (!response.ok) {      
  //               throw new Error(`Request failed with status: ${response.status}`);
  //           }
  //           console.log(" response.json() : "+response.status);
  //           return true;
  //       })
  //       .catch(error => {
  //           comment('An error occurred while creating');
  //           return false;
  
  //       });
  // }
  export const CreateRequest = async (comment, table, newMember) => {
    try {
      const response = await fetch(`http://${config.SERVERPORT}/${table}/${newMember.email}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(newMember)
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      console.log(" response.json() : " + response.status);
      return true; // Return true if the request is successful
    } catch (error) {
      console.error("Error creating request:", error);
      comment('An error occurred while creating');
      return false; // Return false if an error occurs
    }
  };
  
  //export{GetRequest,GetAllRequest,UpdateRequest,DeleteRequest,CreateRequest}
  