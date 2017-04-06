# JSON API REST client for Admin-on-rest.
For using JSON API with admin-on-rest, use the aor-jsonapi-client restClient function to convert AOR's REST dialect into one compatible with JSON API.

## Installation

Aor-jsonapi-client is available from npm. You can install it (and its required dependencies)
using:

```sh
npm install --save-dev aor-jsonapi-client
```
It can also be installed using yarn:
```sh
yarn add aor-jsonapi-client
```

## Usage

```js
//in app.js
import React from 'react';
import { Admin, Resource } from 'admin-on-rest';
import jsonAPIRestClient from 'aor-jsonapi-client/build/restClient';

const restClient = jsonAPIRestClient('http://localhost:3000');

const App = () => (
    <Admin dashboard={Dashboard} restClient={restClient}>
        ...
    </Admin>
);

export default App;
```
