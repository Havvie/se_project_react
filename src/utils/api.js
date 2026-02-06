const baseUrl = "http://localhost:3001";

const headers = {
    "Content-Type": "applications/json",
};

const handleServerResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export const getItems = () => 
    fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }) => {
    return fetch(`${baseUrl}/items`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name,
            imageUrl,
            weather,
        }),
    }).then(handleServerResponse);
};

export const removeCard = (itemID) => {
    return fetch(`${baseUrl}/items/${itemID}`, {
        method: "DELETE",
        headers: this._headers,
    }).then(handleServerResponse);
};

