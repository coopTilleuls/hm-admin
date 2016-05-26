Hm-admin
-----------

[![Build Status](https://travis-ci.org/coopTilleuls/hm-admin.svg?branch=master)](https://travis-ci.org/coopTilleuls/hm-admin)
[![Coverage Status](https://coveralls.io/repos/github/coopTilleuls/hm-admin/badge.svg?branch=master)](https://coveralls.io/github/coopTilleuls/hm-admin?branch=master)
[![npm version](https://badge.fury.io/js/hm-admin.svg)](https://badge.fury.io/js/hm-admin)
[![Join the chat at https://gitter.im/coopTilleuls/hm-admin](https://badges.gitter.im/coopTilleuls/hm-admin.svg)](https://gitter.im/coopTilleuls/hm-admin?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Description
The main goal of this project is to provide a self-generated backoffice which take advantage of the context describe 
  in Hypermedia API. This backoffice should be easy to override via simple configuration variables but must have a good 
  abstraction to allow a deep override if the integrator need it.

The backoffice should respect some rules:
- Keep it simple: this project will not cover all the weirdo cases that your client will invent. It's a basis. Huge enough
 to allow a lot of people to use it with small configuration, but a small basis to contains only required features. 
 (In a second time, the app may be able to allow plugins to increase the features but first things first).
- Keep it clean: this project, by default, respect some auto-discipline (coding guidelines, high code coverage ratio, ...).
  As this project becomes your project, it's not mandatory to follow them but if you want, you can find them 
  right [here][guidelines].
- Keep it User-friendly: this project follows the [Material design recommandations][material-design] to provide a full 
 responsive and nice experience for the final user. It's not a matter about feeding the troll on the Apple/Android
 war. Those recommendations made their proofs so we use them.

> As the full stack of typescript + compilation + tests + ... is quite pain in the ass to install, this project is based 
  on [angular-cli][angular-cli].

## Let's start
### Requirements
- Git
- NPM (we don't use leftpad so everything should be fine ;))
- An Hypermedia API (Have you ever heard of [API Platform][api-platform]?)

### Installation

First, clone the project
```
git clone git@github.com:coopTilleuls/hm-admin.git name-of-your-project 
cd name-of-your-project
```

> Note from Captain Obvious: Don't forget to replace `name-of-your-project` by your project's name.

Then you can install dependencies and start your project
```
npm install -g angular-cli
ng serve
```

And that's it...

### Configuration
Nice try but your app throw an error cause it can't reach your API. Ok. Google himself doesn't know the path of your API.
Or maybe they know? ... hmm. Whatever. There's a minimum configuration that is required and it's your API's path, so let's 
fill it in the `src/app/exemples/admin/configuration.ts` file. There you will find all the stuffs you can configure (items in menu, displayed
field in list, ...)

## Contribution
This project is pretty huge and any help is welcome so feel free to [contribute][contribute]. There's a lot of things to do,
each level of contribution may help (documentation, hotfix, compatibility, big features, ...). Thank you.

## FAQ

### I want to test this awesome tool but I don't have any Hypermedia API. Do you have some advice for me?

Yes, of course. Have you ever heard of [API Platform][api-platform]? This solution helps you to build complex API, compatible with [schema.org][schema]
in a few minutes without being a monster in PHP, Java or any languages. Just some configuration steps.

[angular-cli]: https://github.com/angular/angular-cli
[material-design]: https://www.google.com/design/spec/material-design/introduction.html
[api-platform]: https://api-platform.com/
[schema]: https://schema.org/
[guidelines]: https://angular.io/docs/ts/latest/guide/style-guide.html
[contribute]: /CONTRIBUTING.md
