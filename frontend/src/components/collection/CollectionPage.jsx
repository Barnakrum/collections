import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteCollectionImageMutation, useGetCollectionQuery, useGetUserQuery } from "../../services/backend";
import Spinner from "../utility/Spinner";
import DisplayFieldsNames from "./DisplayFieldsNames";
import { useState } from "react";

const CollectionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, error, isError, isUninitialized, isLoading, isSuccess } = useGetCollectionQuery(id);
    const { data: user, isSuccess: userIsSuccess } = useGetUserQuery(isSuccess ? data.user : { skip: true });

    const [useDeleteImage, useDeleteImageResult] = useDeleteCollectionImageMutation();

    const handleDelete = async () => {
        const response = await useDeleteImage(id);
        if (useDeleteImageResult.isError) {
        } else {
            navigate(0);
        }
    };

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
                        <button
                            onClick={() => {
                                handleDelete();
                            }}
                            className="absolute flex justify-center p-2 border-2 rounded-3xl bg-transparent/80 right-2 bottom-2 md:right-4 md:bottom-4 hover:bg-transparent border-error text-error">
                            <span className="material-symbols-outlined">delete_forever</span>
                        </button>
                    </div>
                    <div className="flex flex-col p-3 m-auto bg-text/10 rounded-b-3xl md:max-w-xl">
                        <div className="flex gap-2">
                            {data.tags.map((tag, index) => (
                                <div className="text-secondary" key={index}>
                                    {tag}
                                </div>
                            ))}
                        </div>
                        {userIsSuccess ? (
                            <div className="flex gap-1">
                                Owner:
                                <Link className="underline" to={"/user/" + user.id}>
                                    {user.username}
                                </Link>
                            </div>
                        ) : (
                            <></>
                        )}
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
