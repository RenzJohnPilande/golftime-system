const PrimaryButton = ({ text, onClick, icon, style = {}, type }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`flex items-center rounded-md px-4 py-2 transition-all duration-200 focus:outline-none focus:ring-0 ${style?.wrapper || ''}`}
        >
            {icon && <span className={`${style?.icon || ''}`}>{icon}</span>}
            {text && <span className={style?.text || ''}>{text}</span>}
        </button>
    );
};

export default PrimaryButton;
