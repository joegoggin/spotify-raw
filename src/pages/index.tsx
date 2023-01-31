import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { api } from "../utils/api";

const Home: NextPage = () => {
	const { data } = api.auth.login.useQuery();

	const router = useRouter();

	const handleClick = () => {
		if (data) {
			void router.push(data.uri);
		}
	};

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
