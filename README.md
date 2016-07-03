# Brand New Congress Website!

This is the project hosting the [Brand New Congress](http://brandnewcongress.org)

## Getting Started

1. Install [Node](https://nodejs.org/en/)
2. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. Go to `http://localhost:3000`
5. Run `npm run lint` to make sure your coding style is compliant.

## Overview of the website

The website is currently split up amongst three different places.  This repo (website) is the main point of entry that brandnewcongress.org hits.  From there, we reverse proxy to Github pages for for half of the static content on the site and to NationBuilder for the rest.  The reason for this is largely that we were trying out different methods, but we do plan to consolidate the site into this repository (see: [https://github.com/BrandNewCongress/website/issues/1](https://github.com/BrandNewCongress/website/issues/1)).

## External services

The website interacts with some external APIs.  Instructions for how to test this stuff in dev are below:

### Nationbuilder

The website uses Nationbuilder as its backing CRM.  This is where it posts signups to and event data to. To test out code that hits Nationbuilder, you are free to use our development sandbox (the API token for which is in the .env file).  You can log in to the [admin interface](https://evanowski.nationbuilder.com/admin) with username `eowski@gmail.com` and password `abc123456`.

### Mailgun

The website uses Mailgun to send emails.  In dev, we use a sandbox account that requires you to be added as a verified recipient.  Request permission from @saikat in Slack to test emails.

## How to contribute

[Read the overview of how to contribute to BNC tech projects](https://github.com/BrandNewCongress/welcome)
