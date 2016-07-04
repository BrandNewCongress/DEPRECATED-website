# Brand New Congress Website!

This is the project hosting the [Brand New Congress](http://brandnewcongress.org)

## Getting Started

1. Install [Node](https://nodejs.org/en/)
2. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. Go to `http://localhost:3000`
5. Run `npm run lint` to make sure your coding style is compliant.

## Caveat

Some website pages still live in Nationbuilder until we get everything consolidated.  See `./src/server/index.js` or the pages that reverse proxy to go.brandnewcongress.org.

## External services

The website interacts with some external APIs.  Instructions for how to test this stuff in dev are below:

### Nationbuilder

The website uses Nationbuilder as its backing CRM.  This is where it posts signups to and event data to. To test out code that hits Nationbuilder, you are free to use our development sandbox (the API token for which is in the .env file).  You can log in to the [admin interface](https://evanowski.nationbuilder.com/admin) with username `eowski@gmail.com` and password `abc123456`.

### Mailgun

The website uses Mailgun to send emails.  In dev, we use a sandbox account that requires you to be added as a verified recipient.  Request permission from @saikat in Slack to test emails.

## How to contribute

[Read the overview of how to contribute to BNC tech projects](https://github.com/BrandNewCongress/welcome)
