const CustomFieldsNames = ({ setFields, fields, name }) => {
    return (
        <div>
            <div className="flex gap-2">
                <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
                <button
                    type="button"
                    onClick={(event) => {
                        setFields([...fields, [""]]);
                    }}>
                    <span className="text-xl material-symbols-outlined text-primary">add_box</span>
                </button>
            </div>
            {fields.map((field, index) => (
                <div key={index} className="flex flex-row gap-1">
                    <input
                        className="w-full"
                        type="text"
                        onChange={(event) => {
                            setFields(
                                fields.map((t, i) => {
                                    if (i === index) {
                                        return event.target.value;
                                    } else {
                                        return t;
                                    }
                                })
                            );
                        }}
                        value={fields[index]}
                        placeholder={field}
                    />
                    <button
                        onClick={() => {
                            setFields(fields.filter((f, i) => i !== index));
                        }}>
                        <span className="text-lg text-error material-symbols-outlined">delete</span>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CustomFieldsNames;
