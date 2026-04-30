import {FaCheck} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";

const ExpenseForm =
    ({
         editItem,
         value,
         handleOpenCloseForm,
         handleSubmit
    }) => {

    return (
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
    )
}

export default ExpenseForm;