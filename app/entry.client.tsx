/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import {RemixBrowser} from "@remix-run/react";
import {startTransition, StrictMode, useState} from "react";
import {hydrateRoot} from "react-dom/client";
import createEmotionCache, {defaultCache} from "~/createEmotionCache";
import {ClientStyleContext} from "./context";
import {CacheProvider} from "@emotion/react";


interface ClientCacheProviderProps {
    children: React.ReactNode;
}

function ClientCacheProvider({children}: ClientCacheProviderProps) {
    const [cache, setCache] = useState(defaultCache)

    function reset() {
        setCache(createEmotionCache())
    }

    return (
        <ClientStyleContext.Provider value={{reset}}>
            <CacheProvider value={cache}>{children}</CacheProvider>
        </ClientStyleContext.Provider>
    )
}

startTransition(() => {
    hydrateRoot(
        document,
        <StrictMode>
            <ClientCacheProvider>
                <RemixBrowser/>
            </ClientCacheProvider>
        </StrictMode>
    );
});
