import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import cookies from "js-cookie";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";


const cacheRtl = createCache({
  key: cookies.get("i18next") === "ar" ? "muirtl" : "muiltr",
  stylisPlugins: [prefixer, rtlPlugin],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<CacheProvider value={cacheRtl}>
			{" "}
			<App />
	</CacheProvider>
);


