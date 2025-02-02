import { Outlet } from "react-router";

import { Header } from "./components/header";
import { Toaster } from "../components/ui/toaster";

export function RootLayout() {
	return (
		<>
			<Header />
			<Outlet />

			<Toaster />
		</>
	);
}
