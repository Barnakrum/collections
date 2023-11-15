const Modal = ({ isOpen, setIsOpen, children }) => {
    return (
        <div onClick={() => setIsOpen(false)} className={`${isOpen ? "visible" : "invisible"} absolute  z-40 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-text/40 w-[100vw] h-[100vh] flex justify-center items-center`}>
            <div
                onClick={(event) => {
                    event.stopPropagation();
                }}
                className="relative z-50 h-48 bg-background w-80">
                <button type="button" onClick={() => setIsOpen(false)} className="hover:text-error relative left-[18rem] top-1 p-1">
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="flex flex-col items-center justify-center p-2">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
