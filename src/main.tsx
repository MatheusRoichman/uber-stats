import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./app/clients/query-client";

import "./index.css";

import { RootLayout } from "./view/layout";
import { Home } from "./view/pages/home";
import { CostReport } from "./view/pages/cost-report";
import { RideHistory } from "./view/pages/ride-history";

const root = document.getElementById("root");

if (root) {
	createRoot(root).render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route element={<RootLayout />}>
							<Route path="/" element={<Home />} />

							<Route path="/cost-report" element={<CostReport />} />

							<Route path="/ride-history" element={<RideHistory />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</StrictMode>,
	);
}
