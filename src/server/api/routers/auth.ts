import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
	login: publicProcedure.query(() => {
		const redirect_uri = "http://localhost:3000";
		const scope =
			"user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";

		return {
			uri: encodeURI(
				`https://accounts.spotify.com/authorize?client_id=${
					process.env.CLIENT_ID as string
				}&response_type=code&redirect_uri=${redirect_uri}&show_dialog=true&scope=${scope}`
			),
		};
	}),
});
