import { React, useState } from "react";
import { config } from "../config.jsx";

export const getRequest = async (table, conditions, state, comment, object ="") => {
    const url = `http://${config.SERVERPORT}/${table}${conditions ? `${conditions}` : ''}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        if (Object.keys(data).length === 0) {
            return comment(`לא נמצא ${object}`);
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

export const getByIdRequest = async (table, id, state, comment) => {
    const url = `http://${config.SERVERPORT}/${table}/${id}}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (Object.keys(data).length === 0) {
            return false;
        } else {
            state(data["data"][0]);
            return true;
        }
    } catch (error) {
        console.error("Error in GetRequest:", error);
        comment(`שגיאת שרת`);
        return false;
    }
};

export const putRequest = async (table, updatedObject, comment) => {
    try {
        const response = await fetch(`http://${config.SERVERPORT}/${table}/${updatedObject.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(updatedObject)
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (Object.keys(data).length === 0) {
            return false;
        }
        return true; 
    } catch (error) {
        console.error(error);
        comment(`שגיאת שרת`);
        return false; 
    }
}

export const DeleteRequest = async (state, comment, id, table) => {
    try {
        const response = await fetch(`http://${config.SERVERPORT}/${table}/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (Object.keys(data).length === 0) {
            comment(`can't delete`);
        } else {
            state(data);
        }
    } catch (error) {
        comment(`Server error: ${error}`);
    }
}

export const postRequest = async ( table, newItem, comment, newID=0) => {
    try {
        const response = await fetch(`http://${config.SERVERPORT}/${table}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(newItem)
        });
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        if(newID !== 0){
            const insertId = data["insertId"];
            await newID(insertId);
        }
        comment("success");
        return true; 

    } catch (error) {
        console.error("Error creating request:", error);
        comment("error");
        return false;
    }
};

export const getByPostRequest = async ( table, newItem, comment) => {
    try {
        const response = await fetch(`http://${config.SERVERPORT}/${table}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(newItem)
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        console.log(" response.json() : " + response.status);
        return true; 
    } catch (error) {
        console.error("Error creating request:", error);
        comment('שגיאת שרת');
        return false;
    }
};
