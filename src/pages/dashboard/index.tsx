import React, { useEffect } from "react";
import PrivatePage from "../../components/auth/PrivatePage";

import { api } from "../../utils/api";

const DashboardPage: React.FC = () => {
	const { data } = api.spotify.getHistory.useQuery();

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<PrivatePage>
			<div>
				<h1>Dashboard</h1>
			</div>
		</PrivatePage>
	);
};

export default DashboardPage;
