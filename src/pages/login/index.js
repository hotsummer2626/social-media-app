import Image from "next/image";
import imageLoader from "@/utils/imageLoader";
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/auth";

const providerList = [
    { id: 1, name: "Google", instance: new GoogleAuthProvider() },
    { id: 2, name: "Facebook", instance: new FacebookAuthProvider() },
];

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col items-center space-y-20 pt-48 bg-green-100 w-full h-screen">
            <div className="rounded-full overflow-hidden flex-shrink-0">
                <Image
                    loader={imageLoader}
                    src="/images/logo.jpg"
                    width={150}
                    height={150}
                    style={{
                        objectFit: "contain",
                    }}
                    alt="logo"
                    unoptimized
                    priority
                />
            </div>
            <div className="flex flex-col items-center space-y-2">
                {providerList.map((provider) => (
                    <div key={provider.id}>
                        <button
                            className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group drop-shadow-md"
                            onClick={() =>
                                signInWithPopup(auth, provider.instance)
                                    .then((res) => {
                                        const user = {
                                            uid: res.user.uid,
                                            userImg: res.user.photoURL,
                                            username: res.user.displayName,
                                            tag: res.user.displayName
                                                .split(" ")
                                                .join("")
                                                .toLocaleLowerCase(),
                                        };
                                        dispatch(login({ authUser: user }));
                                        router.push("/");
                                    })
                                    .catch((err) => alert(err))
                            }
                        >
                            <span className="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                                Sign in with {provider.name}
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Login;
