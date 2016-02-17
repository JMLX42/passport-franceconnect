var OpenIDConnectStrategy = require('passport-openidconnect').Strategy;
var passportAuthenticateWithCUstomClaims = require('./PassportAuthenticateWithCustomClaims').PassportAuthenticateWithCustomClaims;

function Strategy(options, verify)
{
    if (!options.serviceURL)
        options.serviceURL = 'https://fcp.integ01.dev-franceconnect.fr'
    if (!options.authorizationURL)
        options.authorizationURL = options.serviceURL + '/api/v1/authorize';
    if (!options.tokenURL)
        options.tokenURL = options.serviceURL + '/api/v1/token';
    if (!options.userInfoURL)
        options.userInfoURL = options.serviceURL + '/api/v1/userinfo';
    
    var strategy = new OpenIDConnectStrategy(options, verify);
    var alternateAuthenticate = new passportAuthenticateWithCUstomClaims(
        options.userInfoURL,
        options.acrValues,
        1
    );
    strategy.authenticate = alternateAuthenticate.authenticate;

    return strategy;
};

module.exports = Strategy;
