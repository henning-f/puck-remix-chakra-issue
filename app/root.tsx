import {cssBundleHref} from "@remix-run/css-bundle";
import type {LinksFunction} from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import {ChakraProvider} from "@chakra-ui/react";
import {useContext, useEffect} from "react";
import {ClientStyleContext, ServerStyleContext} from "~/context";
import {withEmotionCache} from "@emotion/react";

export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{rel: "stylesheet", href: cssBundleHref}] : []),
];

interface DocumentProps {
    children: React.ReactNode;
}

const Document = withEmotionCache(
    ({children}: DocumentProps, emotionCache) => {
        const serverStyleData = useContext(ServerStyleContext);
        const clientStyleData = useContext(ClientStyleContext);

        // Only executed on client
        useEffect(() => {
            // re-link sheet container
            emotionCache.sheet.container = document.head;
            // re-inject tags
            const tags = emotionCache.sheet.tags;
            emotionCache.sheet.flush();
            tags.forEach((tag) => {
                (emotionCache.sheet as any)._insertTag(tag);
            });
            // reset cache to reapply global styles
            clientStyleData?.reset();
        }, []);

        return (
            <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <Meta/>
                <Links/>
                {serverStyleData?.map(({key, ids, css}) => (
                    <style
                        key={key}
                        data-emotion={`${key} ${ids.join(' ')}`}
                        dangerouslySetInnerHTML={{__html: css}}
                    />
                ))}
            </head>
            <body>
            {/*<Outlet/>*/}
            {children}
            <ScrollRestoration/>
            <Scripts/>
            <LiveReload/>
            </body>
            </html>
        );
    }
);

export default function App() {
    return (
        <Document>
            <ChakraProvider>
                <Outlet/>
            </ChakraProvider>
        </Document>
    );
}
