import React, { createContext, useContext, useEffect, useState } from "react";
import { setToken } from "../utils/api";

interface TokenContext {
	accessToken: string | null;
	refreshToken: string | null;
	setTokenData: (tokenData: {
		accessToken: string;
		refreshToken: string;
	}) => void;
}

const TokenCtx = createContext<TokenContext>({
	accessToken: null,
	refreshToken: null,
	setTokenData: () => {
		return;
	},
});

export const useToken = () => useContext(TokenCtx);

const TokenContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);

	useEffect(() => {
		setAccessToken(localStorage.getItem("accessToken"));
		setRefreshToken(localStorage.getItem("refreshToken"));
	}, []);

	const setTokenData = (tokenData: {
		accessToken: string;
		refreshToken: string;
	}) => {
		localStorage.setItem("accessToken", tokenData.accessToken);
		localStorage.setItem("refreshToken", tokenData.refreshToken);

		setAccessToken(tokenData.accessToken);
		setRefreshToken(tokenData.refreshToken);

		setToken(tokenData.accessToken);
	};

	return (
		<TokenCtx.Provider value={{ accessToken, refreshToken, setTokenData }}>
			{children}
		</TokenCtx.Provider>
	);
};

export default TokenContextProvider;
