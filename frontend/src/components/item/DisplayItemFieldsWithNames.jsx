import { useGetCollectionQuery } from "../../services/backend";
import Spinner from "../utility/Spinner";
import dateFormat, { masks } from "dateformat";

const DisplayItemFieldsWithNames = ({ id, fieldsValues, fieldType, name }) => {
    const { data, error, isLoading, isError } = useGetCollectionQuery(id);

    if (isLoading) return <Spinner />;
    if (isError) return <div>{error.data.message}</div>;

    return (
        <div>
            <h2 className="text-2xl">{name}</h2>
            {data[fieldType + "FieldsNames"].map((field, index) => (
                <div className="flex flex-row gap-1">
                    <p>{field}:</p>
                    <FormattedField key={index} fieldType={fieldType} fieldValue={fieldsValues[index]} />
                </div>
            ))}
        </div>
    );
};

const FormattedField = ({ fieldType, fieldValue }) => {
    if (fieldType === "boolean") {
        if (fieldValue) {
            return <span className="text-accent material-symbols-outlined">new_releases</span>;
        } else return <span className="text-error material-symbols-outlined">block</span>;
    }
    if (fieldType === "color") {
        return (
            <div className="flex flex-row items-center gap-2">
                <p>{fieldValue}</p>
                <p className="w-4 h-4 border-[1px] rounded-full border-text" style={{ backgroundColor: fieldValue }}></p>
            </div>
        );
    }
    if (fieldType === "date") {
        return <p>{dateFormat(fieldValue)}</p>;
    }
    return <p>{fieldValue}</p>;
};

export default DisplayItemFieldsWithNames;
