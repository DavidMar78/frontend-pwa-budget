import {useEffect, useState} from "react";

const useExpenses = () => {

    const [data, setData] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [value, setValue] = useState("");
    const [newEnter, setNewEnter] = useState(false);


    const fetchData = async () => {
        try {
            const res = await fetch("/expenses");

            if (!res.ok) throw new Error("Erreur serveur");

            const data = await res.json();
            setData(prev => {
                if (JSON.stringify(prev) === JSON.stringify(data)) {
                    return prev; // si rien ne change pas de render
                }
                return data;
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/expenses/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Erreur DELETE");

            fetchData();

        } catch (error) {
            console.log(error);
        }
    };

    function handleUpdate(item) {
        setEditItem(item);
        setNewEnter(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formValue = Number(value);
        const formUser = formData.get("user");
        const formShop = formData.get("shop");

        const payload = {
            user: formUser,
            shop: formShop,
            sum: formValue,
            date: Date.now()
        }
        try {
            if (editItem) {
                // UPDATE
                await fetch("/expenses", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
            } else {
                // CREATE
                await fetch("/expenses", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
            }
            //REFRESH DATA
            fetchData();
            //RESET
            setEditItem(null);
            e.target.reset();
            setValue("");
            handleOpenCloseForm();

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // Premier chargement
        fetchData()

        // Refresh toutes les 5 secondes
        const interval = setInterval(() => {
            fetchData()
        }, 5000)

        // clear
        return() => clearInterval(interval)
    },[]);

    // Open or close the form for one new enter
    function handleOpenCloseForm() {
        setNewEnter(prev => !prev);
        setValue("");
        setEditItem(null);
    }

    // Synchronisation de le useState value avec setEditItem
    useEffect(() => {
        if (editItem) {
            setValue(editItem.sum.toString())
        } else {
            setValue("")
        }
    }, [editItem])

    return {
        data,
        newEnter,
        value,
        setValue,
        editItem,
        fetchData,
        handleDelete,
        handleUpdate,
        handleSubmit,
        handleOpenCloseForm
    }
}

export default useExpenses;