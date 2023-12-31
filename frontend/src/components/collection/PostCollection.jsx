import { useEffect, useState } from "react";
import CustomFieldsNames from "./CustomFieldsNames";
import { usePostCollectionMutation } from "../../services/backend";
import { useNavigate } from "react-router-dom";
import Spinner from "../utility/Spinner";

const PostCollection = () => {
    const [collectionName, setCollectionName] = useState("");
    const [tags, setTags] = useState([]);

    const [textFields, setTextFields] = useState([]);
    const [booleanFields, setBooleanFields] = useState([]);
    const [colorFields, setColorFields] = useState([]);
    const [dateFields, setDateFields] = useState([]);
    const [numberFields, setNumberFields] = useState([]);

    const [error, setError] = useState("");

    const [postCollection, postCollectionResult] = usePostCollectionMutation();

    const [response, setResponse] = useState({});

    const navigate = useNavigate();

    const handlePostCollection = async () => {
        const stringFieldsNames = textFields.filter((t) => typeof t === "string");
        const booleanFieldsNames = booleanFields.filter((t) => typeof t === "string");
        const colorFieldsNames = colorFields.filter((t) => typeof t === "string");
        const dateFieldsNames = dateFields.filter((t) => typeof t === "string");
        const numberFieldsNames = numberFields.filter((t) => typeof t === "string");

        setResponse(await postCollection({ name: collectionName, tags, stringFieldsNames, booleanFieldsNames, colorFieldsNames, dateFieldsNames, numberFieldsNames }));
    };

    useEffect(() => {
        if (postCollectionResult.isSuccess) {
            navigate(`/collection/${response.data._id}`);
        } else if (postCollectionResult.isError) {
            setError(response.error.data.message);
        }
    }, [response]);

    return (
        <form
            className="flex flex-col max-w-[80%] md:max-w-lg gap-4 p-4 m-auto text-xl border rounded-lg  bg-text/5 border-text/30"
            onSubmit={(event) => {
                event.preventDefault();
                if (document.activeElement.id === "tags") {
                    return;
                } else {
                    handlePostCollection();
                }
            }}>
            <h1 className="text-3xl text-center text-primary">Add Collection</h1>
            <div className="flex flex-col gap-2 p-4">
                <input
                    type="text"
                    name="name"
                    id=""
                    onChange={(event) => {
                        setCollectionName(event.target.value);
                    }}
                    value={collectionName}
                    placeholder="Name"
                />
                <div className="flex flex-col text-sm">
                    <div className="flex flex-row flex-wrap gap-x-2">
                        {tags.map((tag, index) => (
                            <div className="flex items-center gap-1 p-1 rounded-md bg-text/10" key={index} index={index}>
                                <button
                                    type="button"
                                    className="p-1 rounded-lg bg-text/10 text-error"
                                    onClick={() => {
                                        setTags(tags.filter((t, i) => i !== index));
                                    }}>
                                    <span className="text-sm material-symbols-outlined">delete</span>
                                </button>
                                {tag}
                            </div>
                        ))}
                    </div>

                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                {
                                    let inputText = event.target.value.split(" ").join("").toLowerCase();
                                    if (!tags.includes(inputText) && inputText !== "") {
                                        setTags([...tags, inputText]);
                                    }
                                }
                                event.target.value = "";
                            }
                        }}
                        placeholder="Add tags"
                    />
                </div>
                <div>
                    <h2 className="text-center text-primary">Custom fields</h2>
                    <CustomFieldsNames setFields={setTextFields} fields={textFields} name={"text fields"} />
                    <CustomFieldsNames setFields={setBooleanFields} fields={booleanFields} name={"true/false fields"} />
                    <CustomFieldsNames setFields={setColorFields} fields={colorFields} name={"color fields"} />
                    <CustomFieldsNames setFields={setNumberFields} fields={numberFields} name={"number fields"} />
                    <CustomFieldsNames setFields={setDateFields} fields={dateFields} name={"date fields"} />
                </div>
            </div>
            <div className={`text-error ${postCollectionResult.isError ? "" : "hidden"}`}>{error}</div>
            <button disabled={postCollectionResult.isLoading} className="rounded-lg form-button bg-primary">
                {postCollectionResult.isLoading ? <Spinner /> : "Submit"}
            </button>
        </form>
    );
};

export default PostCollection;
