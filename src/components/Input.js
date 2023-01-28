import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Input = () => {
    const [input, setInput] = useState("");
    const [selectedFile, setSelectFile] = useState(null);
    return (
        <div
            className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}
        >
            <img
                src="/images/avatar.png"
                alt="avatar"
                className="h-11 w-11 rounded-full cursor-pointer"
            />
            <div className="w-full divide-y divide-gray-700">
                <div className={``}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows="2"
                        placeholder="What's happening?"
                        className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
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
            </div>
        </div>
    );
};

export default Input;
