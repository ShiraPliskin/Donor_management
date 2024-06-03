import { React, useState } from "react";
import { config } from "./config.jsx";

export const getRequest = async (table, conditions, state, comment) => {
    const url = `http://${config.SERVERPORT}/${table}${conditions ? `${conditions}` : ''}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (Object.keys(data).length === 0) {
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

export const DeleteRequest = async (state, comment, id, table) => {
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

export const postRequest = async ( table, newItem, comment) => {
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

