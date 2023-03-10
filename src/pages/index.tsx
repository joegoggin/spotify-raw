import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { set } from "zod";
import { useToken } from "../context/TokenContext";

import { api, setToken } from "../utils/api";

const Home: NextPage = () => {
	// state
	const [code, setCode] = useState<string | null>(null);

	// context
	const { accessToken, refreshToken, setTokenData } = useToken();

	// queries
	const { data: uriData } = api.auth.getCode.useQuery();
	const { data: tokenData } = api.auth.getToken.useQuery(code, {
		onSuccess: (data) => {
			if (data) {
				setToken(data.accessToken);
			}
		},
	});

	const router = useRouter();

	const handleClick = () => {
		if (uriData) {
			void router.push(uriData.uri);
		}
	};

	useEffect(() => {
		if (accessToken && refreshToken) void router.push("/dashboard");

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		if (urlParams.has("code")) setCode(urlParams.get("code"));
	}, [router, accessToken, refreshToken]);

	useEffect(() => {
		if (tokenData) {
			setTokenData(tokenData);

			void router.push("/dashboard");
		}
	}, [tokenData, router, setTokenData]);

	return (
		<>
			<Head>
				<title>Spotify Raw</title>
				<meta
					name="description"
					content="See What You've Been Listening To."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-800 to-green-500">
				<h1 className="mb-28 text-8xl text-white">Spotify Raw</h1>
				<button
					className="rounded bg-green-200 p-8"
					onClick={() => void handleClick()}
				>
					Sign In With Spotify!
				</button>
			</main>
		</>
	);
};

export default Home;
