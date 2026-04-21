import "./App.css"
import {useState} from "react";
import Donut from "./components/Donut.jsx";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function App() {
    const [countDavid, setCountDavid] = useState(0);
    const [countLaeti, setCountLaeti] = useState(0);
    const [newEnter, setNewEnter] = useState(false);
    const [historical, setHistorical] = useState([])
    const diffDavid = countDavid - countLaeti;
    const diffLaeti = countLaeti - countDavid;
    const [value, setValue] = useState("");
    const convertDiffDavid = diffDavid.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const convertDiffLaeti = diffLaeti.toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    const date = new Date(Date.now());

    function HandleClickButton() {
        setNewEnter(prev => !prev);
        setValue("");
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValue = Number(formData.get("myInput"));
        const formUser = e.target.user.value;
        const formShop = e.target.shop.value;

        setHistorical(prev => [
            ...prev,
            { user: formUser, shop: formShop, sum: formValue, date: Date.now()}
        ])

        console.log(historical);

        if (formUser === "David") {
            setCountDavid(prev => prev + formValue);
        } else {
            setCountLaeti(prev => prev + formValue);
        }
        HandleClickButton();
        setValue("");
    }

    return (
        <div className="container">
            <h2>BUDGET COURSE</h2>

            <div className="info-container">
                {diffDavid > 0 ? <Donut difference={convertDiffDavid} user="David"/>
                : <Donut difference={convertDiffLaeti} user="Laetitia"/>}

            </div>

            <div>
                {!newEnter ?
                    <>
                        <div>
                            {historical.map((purchase, index) => (
                                <p key={index}>
                                    {date.toLocaleDateString()} | {purchase.user} | {purchase.shop} | {purchase.sum.toLocaleString("fr-FR")} euros
                                </p>
                            ))}
                        </div>
                        <button onClick={HandleClickButton} className="floating-btn">
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