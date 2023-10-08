import { Link, useParams } from "react-router-dom";
import { useGetAllColectionsQuery, useGetUserQuery } from "../../services/backend";
import Spinner from "../utility/Spinner";

const UserProfile = () => {
    const { id } = useParams();
    const { data, error, isLoading, isError } = useGetUserQuery(id);
    const { data: collectionsData, error: collectionsError, isLoading: collectionsIsLoading, isError: collectionsIsError } = useGetAllColectionsQuery({ user: id });

    if (isLoading || collectionsIsLoading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }
    return (
        <div className="max-w-[95%] m-auto mt-5 flex flex-col md:items-center gap-1">
            {data.username}
            <div className="flex flex-col gap-1">
                <h2 className="text-4xl">Collections</h2>
                <div className="flex flex-col gap-2">
                    {collectionsData.map((collection, index) => (
                        <CollectionCard key={index} collection={collection} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const CollectionCard = ({ collection }) => {
    return (
        <div className="max-w-sm p-2 bg-text/10">
            <div className="flex">
                <Link className="w-full text-3xl text-center hover:underline text-primary" to={"/collection/" + collection._id}>
                    {collection.name}
                </Link>
            </div>
            <img className="p-2" src={collection.imageUrl} />
            <div className="flex flex-row gap-2 text-secondary">
                {collection.tags.map((tag, index) => (
                    <div key={index}>{tag}</div>
                ))}
            </div>
        </div>
    );
};

export default UserProfile;
