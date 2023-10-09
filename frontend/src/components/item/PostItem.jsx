import { useNavigate, useParams } from "react-router-dom";
import { useGetCollectionQuery, usePostItemMutation } from "../../services/backend";
import Spinner from "../utility/Spinner";
import { useEffect, useState } from "react";

const PostItem = () => {
    const { id } = useParams();
    const { data, isLoading, isSuccess, isError, error } = useGetCollectionQuery(id);

    const [postItem, postItemResult] = usePostItemMutation();
    const [postItemResponse, setPostItemResponse] = useState({});

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [stringFields, setStringFields] = useState([]);
    const [booleanFields, setBooleanFields] = useState([]);
    const [numberFields, setNumberFields] = useState([]);
    const [dateFields, setDateFields] = useState([]);
    const [colorFields, setColorFields] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const item = { name, description, stringFields, booleanFields, numberFields, dateFields, colorFields };
        setPostItemResponse(await postItem({ id, payload: item }));
    };

    useEffect(() => {
        if (postItemResult.isSuccess) {
            navigate("/item/" + postItemResponse.data._id);
        }
    }, [postItemResponse]);

    if (isLoading) {
        return <Spinner />;
    } else if (isError || postItemResult.isError) {
        return (
            <div className="text-error">
                <div>{error.message}</div>
                <div>{postItemResponse.error.message}</div>
            </div>
        );
    }

    return (
        <form
            onSubmit={(event) => {
                handleSubmit(event);
            }}
            className="flex mt-5 flex-col max-w-[80%] md:max-w-lg gap-4 p-4 m-auto text-xl border rounded-lg  bg-text/5 border-text/30">
            <h1 className="text-3xl text-center ">
                New item for <span className="text-primary">{data.name}</span>
            </h1>

            <label>Name</label>
            <input
                onChange={(event) => {
                    setName(event.target.value);
                }}
                required={true}
                type="text"
            />
            <label>Decription</label>
            <textarea
                onChange={(event) => {
                    setDescription(event.target.value);
                }}
                required={true}
                cols={30}
            />
            <FieldNames data={data.stringFieldsNames} fields={stringFields} setFields={setStringFields} inputType="text" />
            <FieldNames data={data.booleanFieldsNames} fields={booleanFields} setFields={setBooleanFields} inputType="checkbox" />
            <FieldNames data={data.colorFieldsNames} fields={colorFields} setFields={setColorFields} defaultValue="#ff00ff" inputType="color" />
            <FieldNames data={data.numberFieldsNames} fields={numberFields} setFields={setNumberFields} inputType="number" />
            <FieldNames data={data.dateFieldsNames} fields={dateFields} setFields={setDateFields} inputType="datetime-local" />
            <button disabled={postItemResult.isLoading} className="rounded-md form-button bg-primary">
                {postItemResult.isLoading ? <Spinner /> : "Submit"}
            </button>
        </form>
    );
};

export default PostItem;

function FieldNames({ data, inputType, setFields, fields, defaultValue }) {
    return (
        <div>
            {data.map((field, index) => {
                return (
                    <div key={index} className="flex flex-col gap-1">
                        <label>{field}</label>
                        <input
                            required={inputType === "checkbox" ? false : true}
                            type={inputType}
                            onChange={(event) => {
                                setFields(
                                    data.map((f, i) => {
                                        if (i === index) {
                                            if (inputType === "checkbox") {
                                                return event.target.checked;
                                            }
                                            return event.target.value;
                                        } else {
                                            return fields[i];
                                        }
                                    })
                                );
                            }}
                            defaultValue={defaultValue}
                        />
                    </div>
                );
            })}
        </div>
    );
}
