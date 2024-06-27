import { useState } from "react";
import GiftSearch from "./GiftSearch"
import GiftsDisplay from "./GiftsDisplay"
import GiftAdd from "./GiftAdd";

const Gifts = () => {

    const fields = {
        id: '',
        description: '',
        img: '',
        amount: '',
        storage_space: '',
        general_cost: '',
        gift_cost: '',
        importer_id: '',
        success_level: '',
        remarks: ''
    };

    const [giftsToDisplay, setGiftsToDisplay] = useState([]);

    return (
        <>
            <GiftAdd fields={fields} />
            <GiftSearch fields={fields} giftsToDisplay={giftsToDisplay} setGiftsToDisplay={setGiftsToDisplay}/>
            <GiftsDisplay giftsToDisplay={giftsToDisplay} setGiftsToDisplay={setGiftsToDisplay}/>
        </>
    );
};

export default Gifts;
