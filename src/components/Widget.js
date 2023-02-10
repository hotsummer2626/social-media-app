import { db } from "@/utils/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { setPostId } from "@/store/slices/post";
import { useDispatch } from "react-redux";

const Widget = () => {
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(
        () =>
            onSnapshot(collection(db, "posts"), (snapshot) => {
                const documents = snapshot.docs.map((document) => ({
                    postId: document.id,
                    ...document.data(),
                }));
                documents.sort(
                    (a, b) => (b.numberOfLikes || 0) - (a.numberOfLikes || 0)
                );
                setPosts(documents.slice(0, 3));
            }),
        [db]
    );

    return (
        <div className="hidden lg:block  xl:block p-[8px] h-screen">
            <div className="bg-green-100 w-[350px] h-[700px] flex flex-col">
                <div className="p-2 text-lg font-bold text-gray-500">
                    Popular posts
                </div>
                {posts.length > 0 &&
                    posts.map((post) => (
                        <div key={post.postId} className="p-2 w-full">
                            <div className="w-full bg-white drop-shadow-sm p-3 rounded-lg">
                                <div className="flex">
                                    <img
                                        src={post?.userImg}
                                        alt="avatar"
                                        className="h-11 w-11 rounded-full mr-4"
                                    />
                                    <div className="text-gray-500 w-[240px]">
                                        <div className="inline-block group">
                                            <h4
                                                className={`font-bold text-[15px] sm:text-base text-gray-500 group-hover:underline`}
                                            >
                                                {post?.username}
                                            </h4>
                                            <span
                                                className={`text-sm sm:text-[15px] `}
                                            >
                                                @{post?.tag}
                                            </span>
                                        </div>{" "}
                                        ·{" "}
                                        <span className="hover:underline text-sm sm:text-[15px]">
                                            <Moment fromNow>
                                                {post?.timestamp?.toDate()}
                                            </Moment>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <p className="text-gray-500 text-[15px] sm:text-base mt-3 w-[250px] line-clamp-2">
                                        {post?.text}
                                    </p>
                                    <div
                                        className="ml-auto mt-auto text-red-400 hover:underline cursor-pointer"
                                        onClick={() => {
                                            dispatch(setPostId(post?.postId));
                                            router.push(`/${post?.postId}`);
                                        }}
                                    >
                                        READ
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Widget;
