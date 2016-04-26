# RateMDScraper

Scrapes doctor data from `www.ratemds.com`.

## Features

- Scrapes the following information:
  - Name
  - Current overall rating
    - Average
    - Best
    - Worst
    - Number of ratings
  - Latest review
    - Author
    - Rating level
    - Individual ratings
      - Staff
      - Punctuality
      - Helpfulness
      - Knowledge
    - Comment
    - Date created
- Written in ES6

## Planned

- Write in TypeScript
- Poll the doctors page for new reviews
- Email on new review
- Make the doctor dynamic (probably by id)
  - Add lookup?
- Built simple front-end

## Installation

1. Clone the repo `git clone http://github.com/jordond/ratemd-scraper.git`
1. Run `npm install`
1. Run `npm run build`
1. Run `npm start`
1. Navigate to `http://localhost:8080`

## Development

1. Clone the repo `git clone http://github.com/jordond/ratemd-scraper.git`
1. Run `npm install`
1. Run `npm run hook-install` to set up the precommit hook.
1. Then run `npm run dev` *or* `npm run dev-prod` for testing production mode.
1. Edit away, webpack will detect changes and rebuild, and then BrowserSync will reload.

## Tests

Testing framework is now included. In `./test/setup.js` is the setup environment for the tests to be run.  Use `npm test` for a one time execution of all test files.  For developing with testing run the command `npm run dev-test`, this will start the development environment and run the tests in watch mode.

### NPM Scripts

- `npm test`             - Runs mocha-webpack to test all `src/**/*.test.js` files.
- `npm test-watch`       - Runs the above but appends the `--watch` flag.
- `npm run lint`         - Run eslint on all javascript files in `src/`.
- `npm run start`        - Start the server by running `bin/server.js`.
- `npm run start-dev`    - Start server in development mode.
- `npm run build`        - Build all the front-end javascript with webpack.
- `npm run build-watch`  - Builds production code and watches for changes.
- `npm run build-dev`    - Build, and watch for changes.
- `npm run dev`          - Run server in development, and build & watch front end javascript.
- `npm run dev-test`     - Runs the above, but also runs tests in watch mode.
- `npm run hook-install` - Install a precommit hook that will run the tasks in the `package.json`.
- `npm run hook-remove`  - Remove the precommit.

## License

```text
The MIT License (MIT)

Copyright (c) 2016 Jordon de Hoog

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
