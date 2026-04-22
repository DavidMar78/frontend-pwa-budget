import "./App.css"
import {useEffect, useState} from "react";
import Donut from "./components/Donut.jsx";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function App() {
    const [newEnter, setNewEnter] = useState(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState("");
    const date = new Date(Date.now());

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:3001/expenses");

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

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/expenses/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Erreur DELETE");

            fetchData();

        } catch (error) {
            console.log(error);
        }
    };

    function handleClickButton() {
        setNewEnter(prev => !prev);
        setValue("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formValue = Number(formData.get("myInput"));
        const formUser = e.target.user.value;
        const formShop = e.target.shop.value;

        await fetch("http://localhost:3001/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: formUser,
                shop: formShop,
                sum: formValue,
                date: Date.now()
            })
        });
        handleClickButton();
        setValue("");
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
            <h2>BUDGET COURSE</h2>

            <div className="info-container">
                {diffDavid > 0 ? <Donut difference={convertDiffDavid} user="David"/>
                : <Donut difference={convertDiffLaetitia} user="Laetitia"/>}
            </div>

            <div>
                {!newEnter ?
                    <>
                        <div>
                            {data.map((item) => (
                                <div key={item.id} className="line-expense-container">
                                    <p>
                                        {date.toLocaleDateString()} | {item.user} | {item.shop} | {item.sum.toLocaleString("fr-FR")} €
                                    </p>
                                    <button> u </button>
                                    <button onClick={() => handleDelete(item.id)}> x </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleClickButton} className="floating-btn">
                            +
                        </button>
                    </>
                    :
                    <form action="envoi" onSubmit={handleSubmit}>

                        <h2>Nouvelle entrée</h2>
                        <p>Choisissez le payeur</p>
                        <div className="username-container">
                            <label>
                                <input type="radio" name="user" value="David" hidden />
                                <span className="btn-segment">David</span>
                            </label>
                            <label>
                                <input type="radio" name="user" value="Laetitia" hidden />
                                <span className="btn-segment">Laetitia</span>
                            </label>
                        </div>

                        <p>Choisissez la dépense</p>
                        <div className="shop-container">
                            <label>
                                <input type="radio" name="shop" value="Lidl" hidden />
                                <span className="btn-segment">LIDL</span>
                            </label>
                            <label>
                                <input type="radio" name="shop" value="InterM." hidden />
                                <span className="btn-segment">InterM.</span>
                            </label>
                            <label>
                                <input type="radio" name="shop" value="Carrefour" hidden />
                                <span className="btn-segment">Carrefour</span>
                            </label>
                            <label>
                                <input type="radio" name="shop" value="Action" hidden />
                                <span className="btn-segment">Action</span>
                            </label>
                            <label>
                                <input type="radio" name="shop" value="Divers" hidden />
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
                                onClick={HandleClickButton}
                                className="btn-close"
                            >
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