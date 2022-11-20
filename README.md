# passport-franceconnect

[Passport](http://passportjs.org/) strategy for authenticating with [FranceConnect](https://doc.integ01.dev-franceconnect.fr/).

This module lets you authenticate using FranceConnect in your Node.js applications.
By plugging into Passport, FranceConnect authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-franceconnect

## Usage

#### Create an Application

Before using `passport-franceconnect`, you must register as a "service provider" with FranceConnect.
If you have not already done so, you can register at
[Inscription FranceConnect ](https://doc.integ01.dev-franceconnect.fr/inscription).
You will be provided with a client ID and client secret, which
need to be provided to the strategy.  You will also need to configure a callback
URL which matches the route in your application.

#### Configure Strategy

The consumer key and consumer secret obtained when registering as a service provider
are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and
corresponding secret as arguments, as well as `profile` which contains the
authenticated user's FranceConnect profile. The `verify` callback must call `cb`
providing a user to complete authentication.

```javascript
passport.use('france-connect',new FranceConnectStrategy({
    clientID: FRANCECONNECT_CLIENT_ID,
    clientSecret: FRANCECONNECT_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/france-connect/callback"
  },
  function(token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```
Profile content example:
With scope ["profile", "email", "openid", "birthdate","birthplace","birthcountry","familyname","gender"]

```javascript
profile= { 
  id: "UNIQUE ID FROM FRANCE CONNECT",
  displayName: "string",
  name:{
	  familyName: 'Doe',
    givenName: 'John',
    middleName: 'string' 
	},
  _raw: '{"sub":"UNIQUE ID FROM FRANCE CONNECT","birthdate":"1990-01-01","birthplace":"91272","birthcountry":"99100","gender":"male","given_name":"John","family_name":"Doe","email":"john.Doe@france.fr"}',
  _json:
	{ 
		sub: 'UNIQUE ID FROM FRANCE CONNECT',
		birthdate: '1990-01-01',
		birthplace: '91272',
		birthcountry: '99100',
		gender: 'male',
		given_name: 'John',
		family_name: 'Doe',
		email: 'john.doe@france.fr' 
	} 
}
```
If you want use the Family Name you just need call profile.name.familyName and for the gender you need call profile._json.gender

Other options include:

* `scope`: an array of [scopes](https://doc.integ01.dev-franceconnect.fr/fs-scopes)
* `serviceURL` (optional): the URL of the FranceConnect API to use (https://fcp.integ01.dev-franceconnect.fr by default),
* `authorizationURL` (optional): the authorization API endpoint URL (`serviceURL + '/api/v1/authorize'` by default),
* `tokenURL` (optional): the token API endpoint URL (`serviceURL + '/api/v1/token'` by default),
* `userInfoURL` (optional): the user info API endpoint URL (`serviceURL + '/api/v1/userinfo'` by default),
* `acrValues` (optional): the EIDAS level to be used (see https://doc.integ01.dev-franceconnect.fr/fournisseur-service)

#### Test users

By default, the `serviceURL` is set to the FranceConnect development backend URL (https://fcp.integ01.dev-franceconnect.fr).
When using this service URL, you can sign in using the following identity providers and the corresponding test users:

| Identity Provider | Login | Password |
|-------------------|-------|----------|
| ameli.fr          | 111   | 123      |
| ameli.fr          | 112   | 123      |
| ameli.fr          | 113   | 123      |
| ameli.fr          | 114   | 123      |
| ameli.fr          | 115   | 123      |
| ameli.fr          | 116   | 123      |
| ameli.fr          | 117   | 123      |
| ameli.fr          | 118   | 123      |
| ameli.fr          | 119   | 123      |

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'france-connect'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get('/auth/france-connect',
  passport.authenticate('france-connect'));

app.get('/auth/france-connect/callback',
  passport.authenticate('france-connect', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## Support

http://github.com/promethe42/passport-franceconnect/issues

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Jean-Marc Le Roux <[http://github.com/promethe42/](http://github.com/promethe42/)>
