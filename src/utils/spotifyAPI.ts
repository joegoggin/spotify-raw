import SpotifyWebApi from "spotify-web-api-node";

const spotifyAPI = new SpotifyWebApi();

export const getSpotifyAPI = (accessToken: string) => {
	spotifyAPI.setAccessToken(accessToken);
	return spotifyAPI;
};
