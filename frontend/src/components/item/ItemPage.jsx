import { Link, useParams } from "react-router-dom";
import { useGetItemQuery, useGetUserQuery } from "../../services/backend";
import Spinner from "../utility/Spinner";
import UsernameLink from "../user/UsernameLink";
import DisplayItemFieldsWithNames from "./DisplayItemFieldsWithNames";
import CollectionLink from "../collection/CollectionLink";

const ItemPage = () => {
    const { id } = useParams();
    const { error, data, isLoading, isError } = useGetItemQuery(id);

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <div>{error.data.message}</div>;
    }
    return (
        <div>
            <h1 className="text-5xl">{data.name}</h1>
            <div className="flex flex-col gap-2">
                <div className="flex gap-1 text-text/70">
                    Collection:{" "}
                    <p className="text-primary">
                        <CollectionLink id={data.collectionId} />
                    </p>
                    <p>by</p>
                    <p className="text-accent">
                        <UsernameLink id={data.user} />
                    </p>
                </div>
            </div>
            {/* TODO: make description use markdown */}
            <p>{data.description}</p>
            <div>
                <DisplayItemFieldsWithNames id={data.collectionId} fieldType={"string"} fieldsValues={data.stringFields} name={"Text fields"} />
                <DisplayItemFieldsWithNames id={data.collectionId} fieldType={"boolean"} fieldsValues={data.booleanFields} name={"True/False fields"} />
                <DisplayItemFieldsWithNames id={data.collectionId} fieldType={"number"} fieldsValues={data.numberFields} name={"Number fields"} />
                <DisplayItemFieldsWithNames id={data.collectionId} fieldType={"date"} fieldsValues={data.dateFields} name={"Date fields"} />
                <DisplayItemFieldsWithNames id={data.collectionId} fieldType={"color"} fieldsValues={data.colorFields} name={"Color fields"} />
            </div>
        </div>
    );
};

export default ItemPage;
