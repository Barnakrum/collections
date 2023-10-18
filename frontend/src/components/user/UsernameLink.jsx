import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../services/backend";
import Spinner from "../utility/Spinner";

const UsernameLink = ({ id }) => {
    const { data, isLoading } = useGetUserQuery(id);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <Link className="underline" to={"/user/" + id}>
            {data.username}
        </Link>
    );
};

export default UsernameLink;
