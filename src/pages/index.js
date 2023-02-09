import Feed from "@/components/Feed";
import Login from "@/components/Login";
import Modal from "@/components/Modal";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import Outline from "@/components/Outline";

export default function Home({ providers }) {
    const { data: session } = useSession();
    const {
        modal: { isModalOpen },
    } = useSelector((state) => state);

    if (!session) return <Login providers={providers} />;

    return (
        <Outline>
            <Feed />
            {isModalOpen && <Modal />}
        </Outline>
    );
}

export async function getServerSideProps(context) {
    const providers = await getProviders();
    const session = await getSession(context);
    return {
        props: { providers, session },
    };
}
