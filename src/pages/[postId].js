import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Post from "@/components/Post";
import Comment from "@/components/Comment";
import Outline from "@/components/Outline";

const PostPage = () => {
    const router = useRouter();
    const { postId } = router.query;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        let unsubscribe = () => {};
        if (router.isReady) {
            unsubscribe = onSnapshot(doc(db, "posts", postId), (snapshot) =>
                setPost(snapshot.data())
            );
        }
        return () => {
            unsubscribe();
        };
    }, [db, postId]);

    useEffect(() => {
        let unsubscribe = () => {};
        if (router.isReady) {
            unsubscribe = onSnapshot(
                query(
                    collection(db, "posts", postId, "comments"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => setComments(snapshot.docs)
            );
        }
        return () => {
            unsubscribe();
        };
    }, [db, postId]);

    return (
        <Outline>
            <div className="flex items-center px-1.5 py-2 border-b-8 border-white text-gray-500 font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-green-100">
                <div
                    className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                    onClick={() => router.push("/")}
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="h-5 text-gray-500"
                    />
                </div>
                Social Media
            </div>
            {postId && <Post id={postId} post={post} postPage />}
            {comments.length > 0 && (
                <div className="pb-72">
                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment.data()} />
                    ))}
                </div>
            )}
        </Outline>
    );
};

export default PostPage;
