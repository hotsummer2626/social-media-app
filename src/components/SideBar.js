import Image from "next/image";
import imageLoader from "@/utils/imageLoader";
import SideBarLink from "./SideBarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faHashtag,
    faBell,
    faInbox,
    faBookmark,
    faClipboardList,
    faUser,
    faCircleDot,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "@/store/slices/auth";
import { useDispatch } from "react-redux";

const SideBar = () => {
    const dispatch = useDispatch();
    return (
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full bg-green-100">
            <div className="flex items-center justify-center text-lg font-bold space-x-3 hoverAnimation xl:ml-24">
                <div className="flex items-center justify-center w-14 h-14 overflow-hidden bg-black p-0 rounded-full flex-shrink-0">
                    <Image
                        loader={imageLoader}
                        src="/images/logo.jpg"
                        alt="tweet"
                        width={56}
                        height={56}
                        unoptimized
                    />
                </div>
                <div className="hidden text-gray-500  xl:block">
                    Social Media
                </div>
            </div>
            <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
                <SideBarLink text="Home" icon={faHouse} active />
                <SideBarLink text="Explore" icon={faHashtag} />
                <SideBarLink text="Notification" icon={faBell} />
                <SideBarLink text="Messages" icon={faInbox} />
                <SideBarLink text="Bookmarks" icon={faBookmark} />
                <SideBarLink text="Lists" icon={faClipboardList} />
                <SideBarLink text="Profile" icon={faUser} />
                <SideBarLink text="More" icon={faCircleDot} />
            </div>
            <div
                className="text-gray-500 flex items-center justify-center hoverAnimation xl:ml-24 mt-auto space-x-3"
                onClick={() => dispatch(logout())}
            >
                <FontAwesomeIcon
                    icon={faRightFromBracket}
                    className="h-5 xl:inline"
                />
                <div className="hidden xl:block">Logout</div>
            </div>
        </div>
    );
};

export default SideBar;
