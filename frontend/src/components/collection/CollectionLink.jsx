import { Link } from "react-router-dom";
import { useGetCollectionQuery } from "../../services/backend";
import Spinner from "../utility/Spinner";

const CollectionLink = ({ id }) => {
    const { data, error, isLoading, isError } = useGetCollectionQuery(id);

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <div>{error.data.message}</div>;
    }
    return (
        <Link className="underline" to={"/collection/" + id}>
            {data.name}
        </Link>
    );
};

export default CollectionLink;
