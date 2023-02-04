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
    faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";

const SideBar = () => {
    const { data: session } = useSession();
    return (
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
            <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
                <Image
                    loader={imageLoader}
                    src="https://rb.gy/ogau5a"
                    alt="tweet"
                    width={30}
                    height={30}
                    unoptimized
                />
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
            <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
                Tweet
            </button>
            <div
                className="text-[#d9d9d9] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto"
                onClick={signOut}
            >
                <img
                    src={session.user.image}
                    alt="avatar"
                    className="h-10 w-10 rounded-full xl:mr-2.5"
                />
                <div className="hidden xl:inline leading-5">
                    <h4 className="font-bold">{session.user.name}</h4>
                    <p className="text-[#6e767d]">@{session.user.tag}</p>
                </div>
                <FontAwesomeIcon
                    icon={faEllipsis}
                    className="h-5 hidden xl:inline ml-10"
                />
            </div>
        </div>
    );
};

export default SideBar;
