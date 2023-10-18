import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../services/backend";

const UsernameLink = ({ id }) => {
    const { data, isLoading } = useGetUserQuery(id);

    return (
        <Link className="underline" to={"/user/" + id}>
            {data.username}
        </Link>
    );
};

export default UsernameLink;
