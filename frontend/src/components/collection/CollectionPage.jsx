import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteCollectionImageMutation, useGetCollectionQuery, useGetUserQuery } from "../../services/backend";
import Spinner from "../utility/Spinner";
import DisplayFieldsNames from "./DisplayFieldsNames";
import { useState } from "react";
import { useSelector } from "react-redux";

const CollectionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const userId = useSelector((state) => state.session.id);
    const isAdmin = useSelector((state) => state.session.isAdmin);

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
                        {userId === data.user || isAdmin ? (
                            <>
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
                            </>
                        ) : (
                            ""
                        )}
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
                <div className="flex flex-row max-w-[8rem]">
                    {userId === data.user || isAdmin ? (
                        <>
                            <Link className="flex items-center justify-center bg-transparent border-2 rounded-l-lg hover:text-text hover:bg-accent border-accent text-accent grow bg-primary" to={"/item/post/" + id}>
                                <span className="material-symbols-outlined">add_ad</span>
                            </Link>
                            {/* TODO: add deleting modal with confirm */}
                            <button type="button" className="flex items-center justify-center bg-transparent border-2 rounded-r-lg hover:bg-error/50 border-error text-error grow bg-primary">
                                <span className="material-symbols-outlined">folder_delete</span>
                            </button>{" "}
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    }
};

export default CollectionPage;
