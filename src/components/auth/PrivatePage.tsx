import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useToken } from "../../context/TokenContext";

interface PrivateRouteProps {
	children: React.ReactNode;
}

const PrivatePage: React.FC<PrivateRouteProps> = ({ children }) => {
	// context
	const { accessToken, refreshToken } = useToken();

	// router
	const router = useRouter();

	useEffect(() => {
		if (!accessToken || !refreshToken) {
			void router.push("/");
		}
	}, [accessToken, refreshToken, router]);

	return accessToken && refreshToken ? <>{children}</> : <h1>Loading ...</h1>;
};

export default PrivatePage;
