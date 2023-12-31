import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteCollectionImageMutation, useDeleteCollectionMutation, useGetCollectionQuery, useGetUserQuery } from "../../services/backend";
import Spinner from "../utility/Spinner";
import DisplayFieldsNames from "./DisplayFieldsNames";
import { useState } from "react";
import { useSelector } from "react-redux";
import UsernameLink from "../user/UsernameLink";
import ItemList from "../item/ItemList";
import Modal from "../utility/Modal";

const CollectionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const userId = useSelector((state) => state.session.id);
    const isAdmin = useSelector((state) => state.session.isAdmin);

    const { data, error, isError, isUninitialized, isLoading, isSuccess } = useGetCollectionQuery(id);

    const [useDeleteImage, useDeleteImageResult] = useDeleteCollectionImageMutation();
    const [useDeleteCollection, useDeleteCollectionResult] = useDeleteCollectionMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteImage = async () => {
        const response = await useDeleteImage(id);
        if (useDeleteImageResult.isError) {
        } else {
            navigate(0);
        }
    };

    const handleDeleteCollection = async () => {
        const response = await useDeleteCollection(id);
        if (useDeleteCollectionResult.isError) {
        } else {
            navigate("/user/" + data.user);
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
                {/* TODO: add editing collection */}
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
                                        handleDeleteImage();
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

                        <div className="flex gap-1">
                            Owner:
                            <UsernameLink id={data.user} />
                        </div>
                    </div>
                </div>
                <div>
                    <DisplayFieldsNames fields={data.stringFieldsNames} name={"text fields"} />
                    <DisplayFieldsNames fields={data.booleanFieldsNames} name={"true/false fields"} />
                    <DisplayFieldsNames fields={data.colorFieldsNames} name={"color fields"} />
                    <DisplayFieldsNames fields={data.numberFieldsNames} name={"number fields"} />
                    <DisplayFieldsNames fields={data.dateFieldsNames} name={"date fields"} />
                </div>
                <div className="flex flex-row">
                    {userId === data.user || isAdmin ? (
                        <div className="flex flex-row min-w-[8rem]">
                            <Link className="flex items-center justify-center bg-transparent border-2 rounded-l-lg hover:text-text hover:bg-accent border-accent text-accent grow bg-primary" to={"/item/post/" + id}>
                                <span className="material-symbols-outlined">add_ad</span>
                            </Link>
                            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                                <p>
                                    Do you want to delete your collection <span className="text-primary">{data.name}</span>?
                                </p>
                                <div className="flex gap-4">
                                    <button onClick={() => handleDeleteCollection()} className="text-xl text-error" type="button">
                                        Yes
                                    </button>
                                    <button onClick={() => setIsModalOpen(false)} className="text-xl text-text/50" type="button">
                                        No
                                    </button>
                                </div>
                            </Modal>
                            <button type="button" onClick={() => setIsModalOpen(true)} className="flex items-center justify-center bg-transparent border-2 rounded-r-lg hover:bg-error/50 border-error text-error grow bg-primary">
                                <span className="material-symbols-outlined">folder_delete</span>
                            </button>{" "}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <ItemList id={id} />
            </div>
        );
    }
};

export default CollectionPage;
