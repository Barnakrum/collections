import { useEffect } from "react";

const Dropdown = (props) => {
    let dropdown;
    useEffect(() => {
        dropdown = document.getElementById(props.dropdownId);
    });
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
            <div className="relative inline-block">
                <button
                    onClick={() => handleClick()}
                    id={"dropdown-button"}
                    className="bg-primary"
                >
                    {!props.button ? "Button" : props.button}
                </button>
                <div
                    id={props.dropdownId}
                    className="bg-secondary absolute z-[1] hidden min-w-[160px]"
                >
                    {props.values.map((value, index) => (
                        <button
                            className="block"
                            value={value}
                            key={index}
                            type="button"
                            onClick={(event) => {
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
