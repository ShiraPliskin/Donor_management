import { config } from "../config.jsx";

export const getRequest = async (table, conditions, state, comment, object = "") => {
    const url = `http://${config.SERVERPORT}/${table}${conditions ? `${conditions}` : ''}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        if (responseData.data.length === 0) {
            switch (object) {
                case "תורם":
                case "משתמש":
                case "איש קשר":
                    comment(`לא נמצא ${object}`);
                    break;
                case "כתובת מייל":
                    comment("כתובת מייל או סיסמא שגויים.");
                    break;
                default:
                    comment(`לא נמצאה ${object}`);
                    break;
            }
            return 0;
        } else {
            comment("")
            state(responseData.data);
            const total = responseData.total[0]["total"] || responseData.data.length;
            return total;
        }
    } catch (error) {
        console.error("Error in GetRequest:", error);
        comment(`שגיאת שרת`);
        return 0;
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

export const putRequest = async (table, updatedObject, id, setIsSucceed) => {
    try {
        const response = await fetch(`http://${config.SERVERPORT}/${table}/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify(updatedObject)
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (Object.keys(data).length === 0) {
            setIsSucceed("error");
        }

        setIsSucceed("updatedSuccessfully");

    } catch (error) {
        console.error(error);
        setIsSucceed("error");
        return false;
    }
}


export const deleteRequest = async (table, id, setIsSucceed) => {
    try {
        const response = await fetch(`http://${config.SERVERPORT}/${table}/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data ", Object.keys(data).length)

        if (Object.keys(data).length === 0) {
            setIsSucceed("error");
        }
        setIsSucceed("deletedSuccessfully");

    } catch (error) {
        console.error("Error creating request:", error);
        setIsSucceed("error");
        return false
    }
}

export const postRequest = async (table, newItem, comment, newID = 0) => {
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
        if (newID !== 0) {
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

export const getByPostRequest = async (table, newItem, status, commentArea) => {
    try {
        const response = await fetch(`http://${config.SERVERPORT}/${table}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(newItem)
        });

        if (!response.ok) {
            status(response.status);
            throw new Error(`Request failed with status: ${response.status}`);
        }
        console.log(" response.json() : " + response.status);
        status(response.status);
        return true;
    } catch (error) {
        console.error("Error creating request:", error);
        commentArea('שגיאת שרת');
        return false;
    }
};

export const checkIfExist = async (table, conditions, comment, id) => {
    const url = `http://${config.SERVERPORT}/${table}${conditions ? `${conditions}` : ''}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();

        if (Object.keys(data["data"]).length === 0) {
            return true;
        } else {
            return comment("כתובת מייל קיימת במערכת.");
        }
    } catch (error) {
        console.error("Error in GetRequest:", error);
        comment(`שגיאת שרת`);
        return false;
    }
};