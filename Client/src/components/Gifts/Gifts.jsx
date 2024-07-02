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
        importer_id: '1',
        success_level: '',
        remarks: ''
    };

    const [giftsToDisplay, setGiftsToDisplay] = useState([]);
    const [queryString, setQueryString] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [totalGiftsCount, setTotalGiftsCount] = useState(0);

    return (
        <>
            <GiftAdd
                fields={fields}
            />
            <GiftSearch fields={fields}
                giftsToDisplay={giftsToDisplay}
                setGiftsToDisplay={setGiftsToDisplay}
                setQueryString={setQueryString}
                rowsPerPage={rowsPerPage}
                setTotalGiftsCount={setTotalGiftsCount}
            />
            <GiftsDisplay
                giftsToDisplay={giftsToDisplay}
                setGiftsToDisplay={setGiftsToDisplay}
                queryString={queryString}
                rowsPerPage={rowsPerPage}
                totalGiftsCount={totalGiftsCount}
                setTotalGiftsCount={setTotalGiftsCount}
            />
        </>
    );
};

export default Gifts;
