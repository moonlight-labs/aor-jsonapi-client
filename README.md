# JSON API REST client for Admin-on-rest.

A JSONAPI compatible adapter for Admin-on-REST that allows for rapidly building admin interfaces in React using the AOR framework.

## Installation

aor-jsonapi-client is available from npm. You can install it (and its required dependencies)
using:

```sh
npm install aor-jsonapi-client
```

It can also be installed using yarn:

```sh
yarn add aor-jsonapi-client
```

## Usage

```js
//in app.js
import React from "react";
import { Admin, Resource } from "admin-on-rest";
import jsonAPIRestClient from "aor-jsonapi-client/build/restClient";

const restClient = jsonAPIRestClient("http://localhost:3000");

const App = () => (
  <Admin dashboard={Dashboard} restClient={restClient}>
    ...
  </Admin>
);

export default App;
```
