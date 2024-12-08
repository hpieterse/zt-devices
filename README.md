# zt-devices

This site lists all your ZeroTier devices and details about their memberships to your different networks.

The site is hosted on Cloudflare here: [https://zt-devices.pages.dev/](https://zt-devices.pages.dev/)

## Scripts

The following scripts are provided in the `package.json` file:

- `npm run dev`: Starts local dev servers (backend and frontend). It includes live reloading.
- `npm run build`: The build command used for production builds
- `npm run lint`: Run lint checks
- `npm run format`: Run prettier to format code
- `npm run format-check`: Check if all your files are formatted correctly
- `npm run preview`: Run the production build locally. You have to run `npm run build` first.

some of these scripts are also available for the frontend or backend separately.

## Local development setup

The local development setup runs the frontend Vue dev server and a backend server for cloudflare workers.

- The frontend uses the Vite dev server included by default with Vue projects
- The backend workers are run using [wrangler](https://developers.cloudflare.com/workers/wrangler/).

### Calling the backend from the frontend

In production the backend APIs are hosted on the same origin in Cloudflare. Therefore, the APIs can be called using a relative URL.

In development the backend and frontend is hosted on two different ports. The script in the `package.json` sets the port
that the backend is run on to `8788`. This is also defined as an environment variable in `.env.development`. If you want to change the
backend port, you have to edit both the `package.json` and the `.env.development` file.

Additionally, because the backend and frontend are hosted on different origins, you have to set the `CORS` headers in the backend. This is done using middleware in setting a `Access-Control-Allow-Origin` header. The value used for the header is defined in `.dev.vars`. In production the value is not set, therefore, the value used in production
for `Access-Control-Allow-Origin` is `null`
