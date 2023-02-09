import { createTRPCRouter, privateProcedure } from "../trpc";

export const spotifyRouter = createTRPCRouter({
	getCurrentSong: privateProcedure.query(async ({ ctx }) => {
		try {
			const currentSong = await ctx.spotifyAPI.getMyCurrentPlayingTrack();

			return currentSong.body.item;
		} catch (error) {
			throw error;
		}
	}),
});
