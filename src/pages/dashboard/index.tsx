import React, { useEffect, useState } from "react";
import Image from "next/image";
import PrivatePage from "../../components/auth/PrivatePage";

import { api } from "../../utils/api";

/*
 ** TODO **
 ** refresh token
 ** ** find a way to check if token is expired []
 ** ** rerfresh accessToken context []
 ** display current song [x]
 ** display queue []
 */

const DashboardPage: React.FC = () => {
	// state
	const [currentSong, setCurrentSong] =
		useState<SpotifyApi.TrackObjectFull>();

	// queries
	const { data } = api.spotify.getCurrentSong.useQuery();

	// effects
	useEffect(() => {
		setCurrentSong(data as SpotifyApi.TrackObjectFull);
	}, [data]);

	return (
		<PrivatePage>
			<div>
				<h1>{currentSong?.name}</h1>
				<h2>{currentSong?.album.name}</h2>
				<h3>by {currentSong?.artists[0]?.name}</h3>
				<Image
					src={currentSong?.album.images[0]?.url as string}
					alt={currentSong?.album.name as string}
					width={500}
					height={500}
				/>
			</div>
		</PrivatePage>
	);
};

export default DashboardPage;
