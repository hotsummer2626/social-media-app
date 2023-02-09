import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBarLink = ({ icon, text, active }) => {
    return (
        <div
            className={`flex items-center justify-center xl:justify-start text-xl space-x-3 hoverAnimation hover:text-gray-500 ${
                active && "font-bold"
            } ${active && "bg-[#1fc28c]"} ${
                active ? "text-white" : "text-gray-500"
            }`}
        >
            <FontAwesomeIcon className="w-7 h-7" icon={icon} />
            <span className="hidden xl:inline">{text}</span>
        </div>
    );
};

export default SideBarLink;
