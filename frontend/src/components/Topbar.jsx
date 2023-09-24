const Topbar = (props) => {
    return <div className=" bg-text/10 flex min-h-[var(--topbar-height)] w-full items-center justify-between p-4">{props.children}</div>;
};
export default Topbar;
