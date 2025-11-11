## Get started with mock server

### Install Camouflage:

```sh
npm install -g camouflage-server
```

### Start Camouflage:

```sh
cd __mocks__/api
camouflage -c ./config.yml
```

### References:

- [Request model](https://testinggospels.github.io/camouflage/request-model) — this explains what details we can extract from a request whenever we need to parse some parameters from it.
- [Request matching](https://testinggospels.github.io/camouflage/request-matching/) — this explains how to conditionally process parameters received with the request.
- [Folder structure](http://testinggospels.github.io/camouflage/folder-structure/) — this explains the folder structure, in particular the usage of the `__` folder name as a fallback for a path parameter.

  **ATTENTION**: It's really important to understand that Camouflage is not supposed to have **any** business logic in it. It is only meant to serve static content from static paths. Trying to use a path parameter like `userId` the same way as it would be implemented in an API controller (e.g. `GET /users/:userId`) is **not recommended** with Camouflage.

  The purpose of having a folder like `${MOCKS_DIR}/users/__` is to serve whatever is in there for any request that comes to `GET /users/:userId`, where `:userId` can be any value. Camouflage will still serve the corresponding GET/POST/whatever mock file from `${MOCKS_DIR}/users/__` for those requests.

  It is theoretically possible to parse the `userId` parameter from `request.path`. A practical example:

  - Create a file `__mocks__\blah\__\GET.mock`:

    ```
    HTTP/1.1 200 OK
    Content-Type: application/json

    {{#code}}
    (() => {
        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                request: {
                  path: request.path
                }
            })
        };
    })();
    {{/code}}
    ```

  - Then hit `http://localhost:8080/blah/1999`
  - See what it returns
  - If you need to programmatically determine the last path parameter, you can parse the path `/blah/1999` — but remember, this is an **anti-pattern** for Camouflage.
