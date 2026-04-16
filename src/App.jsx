import "./App.css"
import {useState} from "react";
import Donut from "./components/Donut.jsx";

function App() {
    const [countDavid, setCountDavid] = useState(0);
    const [countLaeti, setCountLaeti] = useState(0);
    const [newEnter, setNewEnter] = useState(false);
    const diffDavid = countDavid - countLaeti;
    const diffLaeti = countLaeti - countDavid;

    function HandleClickButton() {
        setNewEnter(prev => !prev);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValue = Number(formData.get("myInput"));
        const formUser = e.target.user.value;

        if (formUser === "david") {
            setCountDavid(prev => prev + formValue);
        } else {
            setCountLaeti(prev => prev + formValue);
        }
        HandleClickButton();
    }

    return (
        <div className="container">
            <h1>BUDGET COURSE</h1>

            <div className="info-container">
                {diffDavid > 0 ? <Donut difference={diffDavid} user="David"/>
                : <Donut difference={diffLaeti} user="Laetitia"/>}

            </div>
            <div>
                {!newEnter ? <button onClick={HandleClickButton} className="floating-btn">
                        +
                </button>
                    :
                <div className="form-container">
                    <h1>Nouvelle entrée</h1>

                    <form action="envoi" onSubmit={handleSubmit}>
                        <select name="user" id="1">
                            <option value="david">David</option>
                            <option value="laetitia">Laetitia</option>
                        </select>
                        <select name="selectedShop" id="2">
                            <option value="LIDL">LIDL</option>
                            <option value="InterMarché">InterMarché</option>
                            <option value="Action">ACTION</option>
                            <option value="Resto">Resto</option>
                        </select>
                        <input type="number"
                               name="myInput"
                               placeholder="Rentrer la somme"
                               required
                        />
                        <button type="submit">Valider</button>
                        <button type="button" onClick={HandleClickButton}>
                            Annuler
                        </button>
                    </form>
                </div>
                }
            </div>
        </div>
        )
}

export default App;