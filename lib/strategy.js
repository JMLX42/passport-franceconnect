var OpenIDConnectStrategy = require('passport-openidconnect').Strategy;
var passportAuthenticateWithCUstomClaims = require('PassportAuthenticateWithCustomClaims').PassportAuthenticateWithCustomClaims;

function Strategy(options, verify)
{
    var strategy = new OpenIDConnectStrategy(options, verify);
    var alternateAuthenticate = new passportAuthenticateWithCUstomClaims(
        options.userInfoURL,
        options.acrValues,
        1
    );
    strategy.authenticate = alternateAuthenticate.authenticate;

    return strategy;
};
