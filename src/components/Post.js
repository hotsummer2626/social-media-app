import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEllipsis,
    faCommentDots,
    faTrashCan,
    faArrowRightArrowLeft,
    faHeart as faHeartFill,
    faShareNodes,
    faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { db } from "@/utils/firebase";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "@/store/slices/modal";
import { setPostId } from "@/store/slices/post";

const Post = ({ id, post, postPage }) => {
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        auth: { currentUser },
    } = useSelector((state) => state);

    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "comments"), (snapshot) =>
                setComments(snapshot.docs)
            ),
        [db, id]
    );

    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
                setLikes(snapshot.docs)
            ),
        [db, id]
    );

    useEffect(() => {
        setLiked(
            likes.findIndex((like) => like.id === currentUser?.uid) !== -1
        );
    }, [likes]);

    const likePost = async () => {
        if (liked) {
            await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
            await updateDoc(doc(db, "posts", id), {
                numberOfLikes: likes.length - 1,
            });
        } else {
            await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
                username: currentUser?.username,
            });
            await updateDoc(doc(db, "posts", id), {
                numberOfLikes: likes.length + 1,
            });
        }
    };
    return (
        <div
            className="p-3 flex cursor-pointer border-b-8 border-white"
            onClick={() => router.push(`/${id}`)}
        >
            {!postPage && (
                <img
                    src={post?.userImg}
                    alt="avatar"
                    className="h-11 w-11 rounded-full mr-4"
                />
            )}
            <div className="flex flex-col space-y-2 w-full">
                <div className={`flex ${!postPage && "justify-between"}`}>
                    {postPage && (
                        <img
                            src={post?.userImg}
                            alt="avatar"
                            className="h-11 w-11 rounded-full mr-4"
                        />
                    )}
                    <div className="text-gray-500">
                        <div className="inline-block group">
                            <h4
                                className={`font-bold text-[15px] sm:text-base text-gray-500 group-hover:underline ${
                                    !postPage && "inline-block"
                                }`}
                            >
                                {post?.username}
                            </h4>
                            <span
                                className={`text-sm sm:text-[15px] ${
                                    !postPage && "ml-1.5"
                                }`}
                            >
                                @{post?.tag}
                            </span>
                        </div>{" "}
                        ??{" "}
                        <span className="hover:underline text-sm sm:text-[15px]">
                            <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                        {!postPage && (
                            <p className="text-gray-500 text-[15px] sm:text-base mt-0.5">
                                {post?.text}
                            </p>
                        )}
                    </div>
                    <div className="icon group flex-shrink-0 ml-auto">
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            className="h-5 text-[#6e767d] group-hover:text-[#1fc28c]"
                        />
                    </div>
                </div>
                {postPage && (
                    <p className="text-gray-500 text-[15px] sm:text-base mt-0.5">
                        {post?.text}
                    </p>
                )}
                {post?.image && (
                    <img
                        src={post?.image}
                        alt="any"
                        className="rounded-2xl max-h-[700px] object-cover mr-2"
                    />
                )}
                <div
                    className={`text-[#6e767d] flex justify-between w-10/12 ${
                        postPage && "mx-auto"
                    }`}
                >
                    <div
                        className="flex items-center space-x-1 group"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setPostId(id));
                            dispatch(setIsModalOpen(true));
                        }}
                    >
                        <div className="icon group-hover:bg-[#1fc28c] group-hover:bg-opacity-10">
                            <FontAwesomeIcon
                                icon={faCommentDots}
                                className="h-5 group-hover:text-[#1fc28c]"
                            />
                        </div>
                        {comments.length > 0 && (
                            <span className="group-hover:text-[#1fc28c] text-sm">
                                {comments.length}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-1 group">
                        {currentUser?.uid === post?.id ? (
                            <div
                                className="icon group-hover:bg-red-600/10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteDoc(doc(db, "posts", id));
                                    router.push("/");
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className="h-5 group-hover:text-red-600"
                                />
                            </div>
                        ) : (
                            <div className="icon group-hover:bg-green-500/10">
                                <FontAwesomeIcon
                                    icon={faArrowRightArrowLeft}
                                    className="h-5 group-hover:text-green-500"
                                />
                            </div>
                        )}
                    </div>
                    <div
                        className="flex items-center space-x-1 group"
                        onClick={(e) => {
                            e.stopPropagation();
                            likePost();
                        }}
                    >
                        <div className="icon group-hover:bg-pink-600/10">
                            {liked ? (
                                <FontAwesomeIcon
                                    icon={faHeartFill}
                                    className="h-5 text-pink-600"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className="h-5 group-hover:text-pink-600"
                                />
                            )}
                        </div>
                        {likes.length > 0 && (
                            <span
                                className={`group-hover:text-pink-600 text-sm ${
                                    liked && "text-pink-600"
                                }`}
                            >
                                {likes.length}
                            </span>
                        )}
                    </div>
                    <div className="icon group">
                        <FontAwesomeIcon
                            icon={faShareNodes}
                            className="h-5 group-hover:text-[#1fc28c]"
                        />
                    </div>
                    <div className="icon group">
                        <FontAwesomeIcon
                            icon={faChartSimple}
                            className="h-5 group-hover:text-[#1fc28c]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
