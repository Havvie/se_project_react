const baseUrl = "http://localhost:3001";

const headers = {
    "Content-Type": "application/json",
};

const handleServerResponse = (res) => {
    if (!res.ok) return Promise.reject(`Error: ${res.status}`);
    if (res.status === 204) return Promise.resolve();
    return res.json();
};

export const getItems = () => 
    fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }) => {
    return fetch(`${baseUrl}/items`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            name,
            imageUrl,
            weather,
        }),
    }).then(handleServerResponse);
};

export const removeItem = (itemID) => {
    return fetch(`${baseUrl}/items/${itemID}`, {
        method: "DELETE",
        headers,
    }).then(handleServerResponse);
};

