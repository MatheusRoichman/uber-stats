import { Outlet } from "react-router";

import { Header } from "./components/header";
import { Toaster } from "../components/toaster";

export function RootLayout() {
	return (
		<>
			<Header />
			<Outlet />

			<Toaster />
		</>
	);
}
