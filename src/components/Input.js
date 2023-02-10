import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXmark,
    faImage,
    faChartSimple,
    faFaceSmile,
    faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { db, storage } from "@/utils/firebase";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSelector } from "react-redux";

const Input = () => {
    const [input, setInput] = useState("");
    const [selectedFile, setSelectFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const filePickerRef = useRef(null);
    const {
        auth: { currentUser },
    } = useSelector((state) => state);

    const sendPost = async () => {
        if (isLoading) return;
        setIsLoading(true);

        const docRef = await addDoc(collection(db, "posts"), {
            uid: currentUser?.uid,
            username: currentUser?.username,
            userImg: currentUser?.userImg,
            tag: currentUser?.tag,
            text: input,
            timestamp: serverTimestamp(),
        });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(
                async () => {
                    const downloadURL = await getDownloadURL(imageRef);
                    await updateDoc(doc(db, "posts", docRef.id), {
                        image: downloadURL,
                    });
                }
            );
        }

        setIsLoading(false);
        setInput("");
        setSelectFile(null);
        setShowEmojis(false);
    };

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (e) => setSelectFile(e.target.result);
    };

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };
    
    return (
        <div
            className={`border-b-8 border-white p-3 flex space-x-3 ${
                isLoading && "opacity-60"
            }`}
        >
            <img
                src={currentUser?.userImg}
                alt="avatar"
                className="h-11 w-11 rounded-full cursor-pointer"
            />
            <div className="w-full divide-y divide-gray-700">
                <div
                    className={`${selectedFile && "py-7"} ${
                        input && "space-y-2.5"
                    }`}
                >
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows="2"
                        placeholder="What's happening?"
                        className="bg-transparent outline-none text-gray-500 text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
                    />
                    {selectedFile && (
                        <div className="relative">
                            <div
                                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                                onClick={() => setSelectFile(null)}
                            >
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="text-white h-5"
                                />
                            </div>
                            <img
                                src={selectedFile}
                                alt=""
                                className="rounded-2xl max-h-80 object-contain"
                            />
                        </div>
                    )}
                </div>
                {!isLoading && (
                    <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                            <div
                                className="icon"
                                onClick={() => filePickerRef.current.click()}
                            >
                                <FontAwesomeIcon
                                    icon={faImage}
                                    className="h-[22px] text-[#1fc28c]"
                                />
                                <input
                                    type="file"
                                    hidden
                                    onChange={addImageToPost}
                                    ref={filePickerRef}
                                />
                            </div>
                            <div className="icon rotate-90">
                                <FontAwesomeIcon
                                    icon={faChartSimple}
                                    className="h-[22px] text-[#1fc28c]"
                                />
                            </div>
                            <div
                                className="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowEmojis(!showEmojis);
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faFaceSmile}
                                    className="h-[22px] text-[#1fc28c]"
                                />
                            </div>
                            <div className="icon">
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="h-[22px] text-[#1fc28c]"
                                />
                            </div>
                            {showEmojis && (
                                <div className="absolute mt-[465px] max-w-[320px] -ml-[40px] rounded-bl-3xl">
                                    <Picker
                                        data={data}
                                        theme="dark"
                                        onEmojiSelect={addEmoji}
                                        onClickOutside={() =>
                                            setShowEmojis(false)
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        <button
                            className="bg-[#1fc28c] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#05ad75] disabled:hover:bg-[#35c293] disabled:opacity-50 disabled:cursor-default"
                            disabled={!input.trim() && !selectedFile}
                            onClick={sendPost}
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
