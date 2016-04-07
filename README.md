# Angular ES6 Starter

A starter application for a front-end only website powered by Angular, webpack and ES6.  Included is a simple node server to host the website.  Which can then be reverse proxied with nginx.

My current workflow is to turn this project into a Docker container, then reverse proxy with Nginx.  More information can be found [Here](https://github.com/jordond/docker-baseSite).  The automatic deployment is handled by Drone.io and the `.drone.yml` configuration file.

## Examples

Sites built with this starter kit:

- [Power Hour](http://powerhourapp.ca)
- [HoogIT](http://hoogit.ca)

## Install

### From source

1. Clone the repo `git clone http://github.com/jordond/angular-es6-starter.git`
1. Run `npm install`
1. Run `npm run build`
1. Run `npm start`
1. Navigate to `http://localhost:8080`

### Docker

1. Docker image is located [here](https://github.com/jordond/docker-baseSite), and a script is included to easily make the container.
1. Clone the repo: `git clone http://github.com/jordond/angular-es6-starter.git`
1. Create a container *or* run script mentioned above:

```bash
  docker run -d \
    --name=AwesomeApp \
    --restart=always \
    -p <port>:8080 \
    -e repo=jordond/AwesomeApp \
    -e branch=develop \
    jordond/baseSite
```

### Notes

- Check out [docker-basesite](https://github.com/jordond/docker-baseSite) for an example nginx and Drone.io config
- I run this in a docker container, then have my nginx server reverse proxy to this.
- `-e branch=<:branch>` defaults to the current checked out branch, or the default git branch.

## Features

- Written with the following technologies:
  - Webpack
  - ES6
  - Angular
  - Node
  - Love
- Run simple server to serve angular files.

## To Do

- TESTS
- Switch to PureCSS instead of SkeletonCSS
- ~~Generalize the docker file to its own image~~

## Development

1. Clone the repo `git clone http://github.com/jordond/angular-es6-starter.git`
1. Run `npm install`
1. Run `npm run hook-install` to set up the precommit hook.
1. Then run `npm run dev` *or* `npm run dev-prod` for testing production mode.
1. Edit away, webpack will detect changes and rebuild, and then BrowserSync will reload.

### NPM Scripts

- `npm run lint`         - Run eslint on all javascript files in `src/`.
- `npm run start`        - Start the server by running `bin/server.js`.
- `npm run start-dev`    - Start server in development mode.
- `npm run build`        - Build all the front-end javascript with webpack.
- `npm run build-dev`    - Build, and watch for changes.
- `npm run dev`          - Run server in development, and build & watch front end javascript.
- `npm run hook-install` - Install a precommit hook that will run the tasks in the `package.json`.
- `npm run hook-remove`  - Remove the precommit.

## License

```text
The MIT License (MIT)

Copyright (c) 2015 Jordon de Hoog

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
