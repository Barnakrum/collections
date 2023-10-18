import { Link } from "react-router-dom";
import { useGetAllItemsQuery } from "../../services/backend";
import Spinner from "../utility/Spinner";

const ItemList = ({ id }) => {
    const { data, isLoading, isError, error } = useGetAllItemsQuery({ collectionId: id });

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <div>{error.data.message}</div>;
    }
    console.log(data);
    return (
        <div>
            {data.map((item, index) => (
                <ItemCard key={index} item={item} />
            ))}
        </div>
    );
};

const ItemCard = ({ item }) => {
    return (
        <div className="flex flex-col gap-2 p-2 border-2 border-primary/30">
            <Link to={"/item/" + item._id}>
                <p className="text-2xl text-center underline">{item.name}</p>
            </Link>
            <p className="w-full overflow-hidden text-text/70 whitespace-nowrap text-ellipsis">{item.description}</p>
        </div>
    );
};

export default ItemList;
