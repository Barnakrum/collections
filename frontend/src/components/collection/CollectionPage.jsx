import { Link, useParams } from "react-router-dom";
import { useGetCollectionQuery } from "../../services/backend";
import Spinner from "../utility/Spinner";
import DisplayFieldsNames from "./DisplayFieldsNames";
import { useState } from "react";

const CollectionPage = () => {
    const { id } = useParams();

    const { data, error, isError, isUninitialized, isLoading } = useGetCollectionQuery(id);

    if (isUninitialized || isLoading) {
        return <Spinner />;
    } else if (isError) {
        console.log(error);
        return <div>{error.data.message}</div>;
    } else {
        return (
            <div className="max-w-[95%] m-auto mt-5 flex flex-col md:items-center gap-1">
                <div>
                    <div className="p-3 md:m-auto bg-text/20 rounded-t-3xl md:max-w-2xl">
                        <h1 className="text-5xl text-center text-primary">{data.name}</h1>
                    </div>
                    <div className="relative md:max-w-3xl ">
                        <img src={data.imageUrl} className="md:m-auto md:rounded-3xl " alt="" />
                        <Link to={"/collection/postImage/" + data._id} className="absolute flex justify-center p-2 border-2 rounded-3xl bg-transparent/80 right-2 top-2 md:right-4 md:top-4 hover:bg-transparent border-secondary text-secondary">
                            <span className="material-symbols-outlined">edit</span>
                        </Link>
                        <button className="absolute flex justify-center p-2 border-2 rounded-3xl bg-transparent/80 right-2 bottom-2 md:right-4 md:bottom-4 hover:bg-transparent border-error text-error">
                            <span className="material-symbols-outlined">delete_forever</span>
                        </button>
                    </div>
                    <div className="p-3 m-auto bg-text/10 rounded-b-3xl md:max-w-xl">
                        <div className="flex gap-2">
                            {data.tags.map((tag, index) => (
                                <div className="text-secondary" key={index}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DisplayFieldsNames fields={data.stringFieldsNames} name={"text fields"} />
                <DisplayFieldsNames fields={data.booleanFieldsNames} name={"true/false fields"} />
                <DisplayFieldsNames fields={data.colorFieldsNames} name={"color fields"} />
                <DisplayFieldsNames fields={data.numberFieldsNames} name={"number fields"} />
                <DisplayFieldsNames fields={data.dateFieldsNames} name={"date fields"} />
            </div>
        );
    }
};

export default CollectionPage;
