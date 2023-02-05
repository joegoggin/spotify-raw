import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { api } from "../utils/api";

const Home: NextPage = () => {
	/*
	 ** TODO **
	 ** fix get token route [x]
	 ** store token in local storage [x]
	 ** redirect to dashboard [x]
	 ** create private routes []
	 ** ** frontend []
	 ** ** backend []
	 */

	const [code, setCode] = useState<string | null>(null);

	const { data: uriData } = api.auth.getCode.useQuery();
	const { data: tokenData } = api.auth.getToken.useQuery(code);

	const router = useRouter();

	const handleClick = () => {
		if (uriData) {
			void router.push(uriData.uri);
		}
	};

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		const accessToken = localStorage.getItem("accessToken");
		const refreshToken = localStorage.getItem("refreshToken");

		if (accessToken && refreshToken) void router.push("/dashboard");

		if (urlParams.has("code")) setCode(urlParams.get("code"));
	}, [router]);

	useEffect(() => {
		if (tokenData) {
			localStorage.setItem("accessToken", tokenData.accessToken);
			localStorage.setItem("refreshToken", tokenData.refreshToken);

			void router.push("/dashboard");
		}
	}, [tokenData, router]);

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
