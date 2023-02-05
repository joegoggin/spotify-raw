import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import TokenContextProvider from "../context/TokenContext";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<TokenContextProvider>
			<Component {...pageProps} />
		</TokenContextProvider>
	);
};

export default api.withTRPC(MyApp);
