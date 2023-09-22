import Dropdown from "./Dropdown";

const ThemeSelector = () => {
    const localStorageItemName = "theme";
    const changeTheme = (theme) => {
        localStorage.setItem(localStorageItemName, theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    };
    const savedTheme = localStorage.getItem(localStorageItemName);
    if (!!savedTheme) changeTheme(savedTheme);
    else changeTheme("default");
    return (
        <Dropdown
            values={["default", "light", "dark"]}
            options={["Default", "Light", "Dark"]}
            dropdownId={"themeDropdown"}
            button={"Theme"}
            localStorageItem={localStorageItemName}
            onOptionClick={changeTheme}
        />
    );
};

export default ThemeSelector;
