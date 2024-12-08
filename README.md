# zt-devices

This site lists all your ZeroTier devices and details about their memberships to your different networks.

The site is hosted on Cloudflare here: [https://zt-devices.pages.dev/](https://zt-devices.pages.dev/)

## Roadmap

Here are some changes and enhancements that the project needs:

### Authentication

It's obviously not a good idea to expect users to enter the ZeroTier API token to log in. In a real project, I would expect the API to use authentication flows like OAuth2 or JWT.

### Testing

A real production application would require automated testing. This should include unit testing and E2E testing.

Usually, I try to follow a TDD approach, but the logic required for the app is not too difficult to test manually during development. This would obviously not suffice in a real-world project.

### Logging

I would integrate some kind of logging service to capture both frontend and backend exceptions in order to monitor the application's health and provide support to users.

### Error handling

The app's error handling is rather limited, where errors are handled in a generic way, for example, not handling 400 and 500 errors differently. In a real project, I would have more specific error handling, and also provide more user-friendly error messages.

### API Design

- I would have liked it if the API could return data separately for the list of devices and the detail page e.g. `/api/devices` and `api/devices/:id`. But because the data from the ZeroTier API has to be pivoted, you have to get all the networks and all their devices. Therefore it's a bit wasteful to separate the two (cause you have to get all the data each time you view a new device).

- I could be more selective in the data being returned from the API. Only returning data that is needed by the front end. In this case, the API is only intended to be used by this specific frontend, so it can be optimised.

### Localization

It is a good idea to think about localization and translations from the start. In my experience the cost of adding it later is much higher that doing it from the start.

### UI Improvements

Here are some small changes to the UI that I would suggest:

- Some of my initial UI ideas changed while I was implementing the UI, and the result is that the tabular data is a bit non-standard where the label for each field is repeated. Some of the UI should be reconsidered and if it is appropriate use more traditional data tables.
- Usability could be improved with icons on the buttons
- I think it would be cool if filtering, searching and sorting could be added to the lists/tabular data.
- Additional data can be displayed on the device detail page. It should be trivial to add more fields (both to the aggregation and the network details view)
- Generally, the layout could be tweaked a lot, especially in regards to optimizing the layout for different screen sizes.
- The login form uses default HTML validation, this could be better. I could also validate the token if it the expected format (length, used character etc.)

## Scripts

The following scripts are provided in the `package.json` file:

- `npm run dev`: Starts local dev servers (backend and frontend). It includes live reloading.
- `npm run build`: The build command used for production builds
- `npm run lint`: Run lint checks
- `npm run format`: Run prettier to format code
- `npm run format-check`: Check if all your files are formatted correctly
- `npm run preview`: Run the production build locally. You have to run `npm run build` first.
- `update-api-types`: Update the typescript types for the ZeroTier API.

Some of these scripts are also available for the frontend or backend separately.

## Local development setup

The local development setup runs the frontend Vue dev server and a backend server for Cloudflare workers.

- The frontend uses the Vite dev server included by default with Vue projects
- The backend workers are run using [wrangler](https://developers.cloudflare.com/workers/wrangler/).

### Calling the backend from the frontend

In production, the backend APIs are hosted on the same origin in Cloudflare. Therefore, the APIs can be called using a relative URL.

In development, the backend and front end are hosted on two different ports. The script in the `package.json` sets the port
that the backend is run on to `8788`. This is also defined as an environment variable in `.env.development`. If you want to change the
backend port, you have to edit both the `package.json` and the `.env.development` files.

Additionally, because the backend and frontend are hosted on different origins, you have to set the `CORS` headers in the backend. This is done using middleware in setting an `Access-Control-Allow-Origin` header. The value used for the header is defined in `.dev.vars`. In production, the value is not set, therefore, the value used in production
for `Access-Control-Allow-Origin` is `null`
