import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const queryClient = new QueryClient();

persistQueryClient({
	queryClient,
	persister: createSyncStoragePersister({
		storage: localStorage,
	}),
});
