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
- Bundle with Electron as a desktop app for ease of use
- Built simple front-end

## Installation

TODO

## Contributing

TODO

## License

```
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