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

## How to contribute

[Read the overview of how to contribute to BNC tech projects](https://github.com/BrandNewCongress/welcome)
