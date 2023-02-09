import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import Post from "./Post";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useSession } from "next-auth/react";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const {data:session} = useSession()

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "posts"), orderBy("timestamp", "desc")),
                (snapshot) => setPosts(snapshot.docs)
            ),
        [db]
    );

    return (
        <div className="text-white flex-grow max-w-2xl sm:ml-[73px] xl:ml-[370px] bg-green-100">
            <div className="text-gray-500 flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 border-b-8 border-white bg-green-100">
                <h2 className="text-lg sm:text-xl font-bold">Hello, {session.user.name} !!!</h2>
                <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:p-0 ml-auto">
                    <FontAwesomeIcon icon={faStar} className="h-5 text-gray-500" />
                </div>
            </div>
            <Input />
            <div className="pb-72">
                {posts.map((post) => (
                    <Post key={post.id} id={post.id} post={post.data()} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
