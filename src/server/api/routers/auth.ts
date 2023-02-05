import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
	getCode: publicProcedure.query(() => {
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
	getToken: publicProcedure
		.input(z.string().nullable())
		.query(async ({ input: code }) => {
			if (code) {
				const bodyData = `code=${code}&redirect_uri=http://localhost:3000&grant_type=authorization_code`;
				const authorization = `${process.env.CLIENT_ID as string}:${
					process.env.CLIENT_SECRET as string
				}`;

				const response: {
					data: { access_token: string; refresh_token: string };
				} = await axios.post(
					"https://accounts.spotify.com/api/token",
					encodeURI(bodyData),
					{
						headers: {
							Authorization:
								"Basic " +
								new Buffer(authorization).toString("base64"),
							"Content-Type": "application/x-www-form-urlencoded",
						},
					}
				);

				return {
					accessToken: response.data.access_token,
					refreshToken: response.data.refresh_token,
				};
			}

			return null;
		}),
});
