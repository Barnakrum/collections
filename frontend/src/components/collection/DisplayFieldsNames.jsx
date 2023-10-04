const DisplayFieldsNames = ({ fields, name }) => {
    return (
        <div>
            <div className="text-xl">
                <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
            </div>

            <div className="flex ">
                {fields.map((field, index) => (
                    <div key={index} className="px-2 border-l-2 first:border-l-0 text-text/60">
                        {field}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayFieldsNames;
