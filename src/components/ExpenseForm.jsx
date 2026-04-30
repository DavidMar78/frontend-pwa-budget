import {FaCheck} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";

const ExpenseForm =
    ({
         data,
         editItem,
         value,
         setValue,
         handleOpenCloseForm,
         handleSubmit
    }) => {



    return (
        <form action="envoi" onSubmit={handleSubmit}>
            { editItem ? <h2>Modifier la dépense</h2> : <h2>Nouvelle dépense</h2> }
            <p>Choisissez le payeur</p>
            <div className="username-container">
                {data.map((item, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name="user"
                            value={item.user}
                            defaultChecked={editItem?.user === item.user}
                            required
                        />
                        <span className="btn-segment">{item.user}</span>
                    </label>
                ))}
            </div>

            <p>Choisissez la dépense</p>
            <div className="shop-container">
                {data.map((item, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            name="shop"
                            value={item.shop}
                            defaultChecked={editItem?.shop === item.shop}
                            required
                        />
                        <span className="btn-segment">{item.shop}</span>
                    </label>
                ))}
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