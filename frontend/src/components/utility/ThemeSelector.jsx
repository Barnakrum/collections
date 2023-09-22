import Dropdown from "./Dropdown";

const ThemeSelector = () => {
    const changeTheme = (theme) => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    };
    const savedTheme = localStorage.getItem("theme");
    if (!!savedTheme) changeTheme(savedTheme);
    else changeTheme("default");
    return (
        <Dropdown
            values={["default", "light", "dark"]}
            options={["Default", "Light", "Dark"]}
            dropdownId={"themeDropdown"}
            button={"Theme"}
            onOptionClick={changeTheme}
        />
    );
};

export default ThemeSelector;
