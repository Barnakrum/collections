import { useEffect, useState } from "react";

const Dropdown = (props) => {
    const [dropdown, setDropdown] = useState(
        document.getElementById(props.dropdownId),
    );
    const [selectedOption, setSelectedOption] = useState(
        localStorage.getItem(props.localStorageItem),
    );
    useEffect(() => {
        setDropdown(document.getElementById(props.dropdownId));
    }, [selectedOption]);
    const handleClick = () => {
        dropdown.classList.toggle("hidden");
    };

    window.onclick = (event) => {
        if (
            !event.target.matches("#dropdown-button") &&
            !dropdown.classList.contains("hidden")
        ) {
            handleClick();
        }
    };

    return (
        <>
            <div className="relative inline-block w-full">
                <button
                    onClick={() => handleClick()}
                    id={"dropdown-button"}
                    className=" block w-full rounded-sm text-right"
                >
                    {!props.button ? "Button" : props.button}
                </button>
                <div
                    id={props.dropdownId}
                    className="bg-background border-primary absolute right-0 z-[1] hidden rounded-sm border-2 p-2 "
                >
                    {props.values.map((value, index) => (
                        <button
                            className={
                                (value === selectedOption
                                    ? "border-primary border"
                                    : "") +
                                "  block w-full rounded-sm px-4 py-1"
                            }
                            value={value}
                            key={index}
                            disabled={value === selectedOption ? true : false}
                            type="button"
                            onClick={(event) => {
                                setSelectedOption(event.target.value);

                                handleClick();
                                props.onOptionClick(event.target.value);
                            }}
                        >
                            {props.options[index]}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Dropdown;
