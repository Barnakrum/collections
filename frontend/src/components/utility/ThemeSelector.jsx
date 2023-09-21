import Dropdown from "./Dropdown";

const ThemeSelector = () => {
    const changeTheme = (theme) => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    };
    const savedTheme = localStorage.getItem("theme");
    if (!!savedTheme) changeTheme(savedTheme);
    return (
        <Dropdown
            values={["light", "dark"]}
            options={["Light", "Dark"]}
            dropdownId={"themeDropdown"}
            button={"Theme"}
            onOptionClick={changeTheme}
        />
    );
};

export default ThemeSelector;
