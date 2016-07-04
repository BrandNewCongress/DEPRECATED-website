# Brand New Congress Website!

This is the project hosting the [Brand New Congress](http://brandnewcongress.org)

## Getting Started for Developers

1. Install [Node](https://nodejs.org/en/)
2. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. Go to `http://localhost:3000`
5. Run `npm run lint` to make sure your coding style is compliant.

## Getting Started for Non Developers

The website has some fancy, javascript filled pages (like [the tour](http://brandnewcongress.org/tour)), but a lot of the content on the site is just static content.  Instead of using a content management system (like Nationbuilder) or a wiki, these static pages are simple markdown templates that exist right here within this very Github repository. [Read more about how you can suggest edits and create new pages in the website](https://github.com/BrandNewCongress/website/tree/master/src/static/site).

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
