import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useVerifyQuery } from "../../services/backend";

const VerifyEmail = () => {
    let { token, email } = useParams();

    const { data, error, isFetching, isLoading, isError } = useVerifyQuery({ token, email });

    return (
        <div>
            <div>{!data ? "" : data.message}</div>
            <div>{isError ? error.data.message : ""}</div>
        </div>
    );
};

export default VerifyEmail;
