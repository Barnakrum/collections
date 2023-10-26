import { Link } from "react-router-dom";
import { useGetAllItemsQuery } from "../../services/backend";
import Spinner from "../utility/Spinner";
import { useSelector } from "react-redux";

const ItemList = ({ id }) => {
    const { data, isLoading, isError, error } = useGetAllItemsQuery({ collectionId: id });

    const userId = useSelector((state) => state.session.id);
    const isAdmin = useSelector((state) => state.session.isAdmin);

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <div>{error.data.message}</div>;
    }
    return (
        <div>
            {data.map((item, index) => (
                <ItemCard key={index} item={item} canModify={isAdmin || item.user === userId} />
            ))}
        </div>
    );
};

const ItemCard = ({ item, canModify }) => {
    return (
        <div className="relative flex flex-col gap-2 p-2 border-2 border-primary/30 group">
            <div className="absolute flex invisible top-2 right-2 group-hover:visible">
                {/* {TODO: add delete and edit functionality} */}
                <button type="button">
                    <span className="text-error hover:animate-pulse material-symbols-outlined">delete_forever</span>
                </button>
                <button type="button">
                    <span className="text-accent hover:animate-pulse material-symbols-outlined">edit</span>
                </button>
            </div>
            <Link to={"/item/" + item._id}>
                <p className="text-2xl text-center underline">{item.name}</p>
            </Link>
            <p className="w-full overflow-hidden text-text/70 whitespace-nowrap text-ellipsis">{item.description}</p>
        </div>
    );
};

export default ItemList;
