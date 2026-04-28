import "./App.css"
import {useEffect, useState} from "react";
import Donut from "./components/Donut.jsx";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

function App() {
    const [newEnter, setNewEnter] = useState(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const [editItem, setEditItem] = useState(null);

    const fetchData = async () => {
        try {
            const res = await fetch("/expenses");

            if (!res.ok) throw new Error("Erreur serveur");

            const data = await res.json();
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData()
    },[]);

    // Synchronisation de le useState value avec setEditItem
    useEffect(() => {
            if (editItem) {
                console.log(editItem)
                setValue(editItem.sum.toString())
            } else {
                setValue("")
            }
    }, [editItem])

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
    // Open or close the form for one new enter
    function handleOpenCloseForm() {
        setNewEnter(prev => !prev);
        setValue("");
        setEditItem(null);
    }

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

    const totalDavid = data
        .filter(item => item.user === "David")
        .reduce((acc, item) => acc + item.sum, 0)

    const totalLaetitia = data
        .filter(item => item.user === "Laetitia")
        .reduce((acc, item) => acc + item.sum, 0)

    const diffDavid = totalDavid - totalLaetitia;
    const diffLaetitia = totalLaetitia - totalDavid;

    const convertDiffDavid = diffDavid.toLocaleString("fr-FR",{
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const convertDiffLaetitia = diffLaetitia.toLocaleString("fr-FR",{
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return (
        <div className="container">
            <h2>BUDGET COURSE v1-2</h2>

            <div className="info-container">
                {diffDavid > 0 ? <Donut difference={convertDiffDavid} user="David"/>
                : <Donut difference={convertDiffLaetitia} user="Laetitia"/>}
            </div>

            <div className="list-container">
                {!newEnter ?
                    <>
                        <div>
                            {data.map((item, index) => (
                                <div key={index} className={`line-expense-container ${index % 2 === 0 ? "cel-light" : "cel-dark"}`}>
                                    <p>
                                        {new Date(item.date).toLocaleDateString("fr-FR")} | {item.user} | {item.shop} | {item.sum.toLocaleString("fr-FR")} €
                                    </p>
                                    <FaPen
                                        onClick={() => handleUpdate(item)}
                                        color={"#51cf66"}
                                        fontSize={"20px"}
                                    />
                                    <AiFillCloseCircle
                                        onClick={() => handleDelete(item.id)}
                                        color={"#ff6b6b"}
                                        fontSize={"30px"}
                                    />
                                </div>
                            ))}
                        </div>
                        <button onClick={handleOpenCloseForm} className="floating-btn">
                            +
                        </button>
                    </>
                    :
                    <form action="envoi" onSubmit={handleSubmit}>
                        { editItem ? <h2>Modifier la dépense</h2> : <h2>Nouvelle dépense</h2> }
                        <p>Choisissez le payeur</p>
                        <div className="username-container">
                            <label>
                                <input
                                    type="radio"
                                    name="user"
                                    value="David"
                                    defaultChecked={editItem?.user === "David"}
                                    required
                                />
                                <span className="btn-segment">David</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="user"
                                    value="Laetitia"
                                    defaultChecked={editItem?.user === "Laetitia"}
                                />
                                <span className="btn-segment">Laetitia</span>
                            </label>
                        </div>

                        <p>Choisissez la dépense</p>
                        <div className="shop-container">
                            <label>
                                <input
                                    type="radio"
                                    name="shop"
                                    value="Lidl"
                                    defaultChecked={editItem?.shop === "Lidl"}
                                    required
                                />
                                <span className="btn-segment">LIDL</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="shop"
                                    value="InterM."
                                    defaultChecked={editItem?.shop === "InterM."}
                                />
                                <span className="btn-segment">InterM.</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="shop"
                                    value="Carrefour"
                                    defaultChecked={editItem?.shop === "Carrefour"}
                                />
                                <span className="btn-segment">Carrefour</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="shop"
                                    value="Action"
                                    defaultChecked={editItem?.shop === "Action"}
                                />
                                <span className="btn-segment">Action</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="shop"
                                    value="Resto"
                                    defaultChecked={editItem?.shop === "Resto"}
                                />
                                <span className="btn-segment">Resto</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="shop"
                                    value="Divers"
                                    defaultChecked={editItem?.shop === "Divers"}
                                />
                                <span className="btn-segment">Divers</span>
                            </label>
                        </div>

                        <p>Entrez le montant:</p>
                        <label>
                            <input type="number"
                                   step="0.01"
                                   name="myInput"
                                   required
                                   className="input-sum"
                                   value={value}
                                   onChange={(e) => {
                                       let val = e.target.value;
                                       val = val.replace(",",".");
                                       if (/^\d*\.?\d{0,2}$/.test(val)) {
                                           setValue(val);
                                       }
                                   }}
                            />
                        </label>

                        <div className="btn-submit-cont">
                            <button type="submit">
                                <FaCheck color="#0bcf0b" size="25px"/>
                            </button>
                            <button
                                type="button"
                                onClick={handleOpenCloseForm}
                                className="btn-close">
                                <IoMdClose color="#ff3f3f" size="30px"/>
                            </button>
                        </div>

                    </form>
                }
            </div>
        </div>
        )
}

export default App;