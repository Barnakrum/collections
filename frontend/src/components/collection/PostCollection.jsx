import { useState } from "react";
import CustomFieldsNames from "./CustomFieldsNames";

const PostCollection = () => {
    const [tags, setTags] = useState([]);

    const [textFields, setTextFields] = useState([]);
    const [booleanFields, setBooleanFields] = useState([]);
    const [colorFields, setColorFields] = useState([]);
    const [dateFields, setDateFields] = useState([]);
    const [numberFields, setNumberFields] = useState([]);

    return (
        <form
            className="flex flex-col max-w-[80%] md:max-w-lg gap-4 p-4 m-auto text-xl border rounded-lg  bg-text/5 border-text/30"
            onSubmit={(event) => {
                event.preventDefault();
                if (document.activeElement.id === "tags") {
                    return;
                } else {
                    //submit logic here
                }
            }}>
            <h1 className="text-3xl text-center text-primary">Add Collection</h1>
            <div className="flex flex-col gap-2 p-4">
                <input type="text" name="name" id="" placeholder="Name" />
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
            <button type="submit" className="rounded-lg form-button bg-primary">
                Submit
            </button>
        </form>
    );
};

export default PostCollection;
