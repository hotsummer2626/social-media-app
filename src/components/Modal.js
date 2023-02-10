import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { setIsModalOpen } from "@/store/slices/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faImage,
    faChartSimple,
    faFaceSmile,
    faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import Moment from "react-moment";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useRouter } from "next/router";

const Modal = () => {
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const {
        auth: { currentUser },
        modal: { isModalOpen },
        post: { postId },
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(
        () =>
            onSnapshot(doc(db, "posts", postId), (snapshot) =>
                setPost(snapshot.data())
            ),
        [db]
    );

    const sendComment = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "posts", postId, "comments"), {
            comment,
            username: currentUser.username,
            tag: currentUser.tag,
            userImg: currentUser.userImg,
            timestamp: serverTimestamp(),
        });

        dispatch(setIsModalOpen(false));
        setComment("");

        router.push(`/${postId}`);
    };

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setComment(comment + emoji);
    };

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-50 inset-0 pt-8"
                onClose={() => dispatch(setIsModalOpen(false))}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center pt-14 pb-20 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform rounded-2xl bg-green-100 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-center px-1.5 py-2 border-b border-gray-500">
                                    <div
                                        className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                                        onClick={() =>
                                            dispatch(setIsModalOpen(false))
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className="h-[22px] text-gray-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                                    <div className="w-full">
                                        <div className="text-gray-500 flex gap-x-3 relative">
                                            <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-500" />
                                            <img
                                                src={post?.userImg}
                                                alt="avatar"
                                                className="h-11 w-11 rounded-full"
                                            />
                                            <div>
                                                <div className="inline-block group">
                                                    <h4 className="font-bold text-[15px] sm:text-base text-gray-500 inline-block">
                                                        {post?.username}
                                                    </h4>
                                                    <span className="ml-1.5 text-sm sm:text-[15px]">
                                                        @{post?.tag}
                                                    </span>
                                                </div>{" "}
                                                ·{" "}
                                                <span className="hover:underline text-sm sm:text-[15px]">
                                                    <Moment fromNow>
                                                        {post?.timestamp?.toDate()}
                                                    </Moment>
                                                </span>
                                                <p className="text-gray-500 text-[15px] sm:text-base">
                                                    {post?.text}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-7 flex space-x-3 w-full">
                                            <img
                                                src={currentUser?.userImg}
                                                alt="avatar"
                                                className="h-11 w-11 rounded-full"
                                            />
                                            <div className="flex-grow mt-2 divide-y divide-gray-700">
                                                <textarea
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Type your reply"
                                                    rows="2"
                                                    className="bg-transparent outline-none text-gray-500 text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                                                />
                                                <div className="flex items-center justify-between pt-2.5">
                                                    <div className="flex items-center">
                                                        <div className="icon">
                                                            <FontAwesomeIcon
                                                                icon={faImage}
                                                                className="h-[22px] text-[#1fc28c]"
                                                            />
                                                            <input
                                                                type="file"
                                                                hidden
                                                            />
                                                        </div>
                                                        <div className="icon rotate-90">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faChartSimple
                                                                }
                                                                className="h-[22px] text-[#1fc28c]"
                                                            />
                                                        </div>
                                                        <div
                                                            className="icon"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setShowEmojis(
                                                                    !showEmojis
                                                                );
                                                            }}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faFaceSmile
                                                                }
                                                                className="h-[22px] text-[#1fc28c]"
                                                            />
                                                        </div>
                                                        <div className="icon">
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faCalendar
                                                                }
                                                                className="h-[22px] text-[#1fc28c]"
                                                            />
                                                        </div>
                                                        {showEmojis && (
                                                            <div className="absolute mt-[465px] max-w-[320px] -ml-[40px] rounded-bl-3xl">
                                                                <Picker
                                                                    data={data}
                                                                    theme="dark"
                                                                    onEmojiSelect={
                                                                        addEmoji
                                                                    }
                                                                    onClickOutside={() =>
                                                                        setShowEmojis(
                                                                            false
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        className="bg-[#1fc28c] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#05ad75] disabled:hover:bg-[#35c293] disabled:opacity-50 disabled:cursor-default"
                                                        disabled={
                                                            !comment.trim()
                                                        }
                                                        onClick={sendComment}
                                                    >
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;
