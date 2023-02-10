import "@/styles/global.css";
import { Provider } from "react-redux";
import store from "@/store";

export default function App({ Component, pageProps: { ...pageProps } }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
