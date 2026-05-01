export const fetchExpense = async () => {
    // je recup les depenses ds res en demandant au server
    const res = await fetch("/expenses");
    // verifucation: si erreur http => stop
    if (!res.ok) throw new Error("Erreur serveur");
    // conversion du json en js
    const data = await res.json();
    // renvoie les données a celui qui appelle la fonction
    return data;
};

export const createExpense = async (payload) => {
    await fetch("/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
};

export const updateExpense = async (payload) => {
    await fetch("/expenses", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
};

export const deleteExpense = async (id) => {
    const res =
        await fetch(`/expenses/${id}`, {
            method: "DELETE"
        });
    if (!res.ok) throw new Error("Erreur DELETE");
};

