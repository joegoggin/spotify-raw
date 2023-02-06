import { createTRPCRouter, privateProcedure } from "../trpc";

export const spotifyRouter = createTRPCRouter({
	getHistory: privateProcedure.query(({ ctx }) => {
		const { token } = ctx;

		const auth = token;

		return {
			auth,
		};
	}),
});
