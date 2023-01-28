import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBarLink = ({ icon, text, active }) => {
    return (
        <div
            className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation ${
                active && "font-bold"
            }`}
        >
            <FontAwesomeIcon className="w-7 h-7" icon={icon} />
            <span className="hidden xl:inline">{text}</span>
        </div>
    );
};

export default SideBarLink;
