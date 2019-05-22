import * as express from 'express';
import * as ReactDOMServer from 'react-dom/server';
import {Readable} from 'stream';
import {EnvironmentVariablesService} from './services/environmentVariablesService';
import {fetchMovieDetails, fetchShowDetails} from "./services/rest";

const webapp = require('./serverapp.bundle.js');

const app = express();
const proxy = require('express-http-proxy');
const https = require('https');
const http = require('http');

const envVariablesService = new EnvironmentVariablesService();
const envGaId = envVariablesService.getGaId();
const envFacebookClientId = envVariablesService.getFacebookClientId();
const envGoogleReCaptchaSitekey = envVariablesService.getGoogleReCaptchaSitekey();
const isGoogleReCaptchaEnabled = envVariablesService.isGoogleReCaptchaEnabled();

const sslOptions = {
    cert: envVariablesService.getSslFullChain(),
    key: envVariablesService.getSslPrivKey()
};

const ONE_HOUR = 3600000;

const compression = require('compression');
app.use(compression());
app.use('/public', express.static('./dist/public', { maxAge: ONE_HOUR }));
app.use('/api', proxy('apiapp:3000', {
    proxyReqPathResolver: function(req : any) {
        return require('url').parse(req.url).path;
    }
}));

app.get('/details/:type/:id', async function (req, res) {
    generateBasicMarkup(req, res);
});


app.get('*', function (req, res) {
    generateBasicMarkup(req, res);
});

async function generateBasicMarkup(req: any, res: any) {
    let ogTags = "";

    if(req.params && req.params.id) {
        const id = req.params.id;
        const type = req.params.type;

        let title = "";
        let image = "";

        try {
            if (type === "movie") {
                const movie = await fetchMovieDetails(req.hostname, id);
                title = movie.title;
                image = movie.backdrop_image[0].path;
            } else {
                const show = await fetchShowDetails(req.hostname, id);
                title = show.title;
                image = show.backdrop_image[0].path;
            }
        } catch(e) {
            console.log(e);
        }

        const SocialTitle = `Take The DuVernay Test for ${title}`;
        const SocialDescription = `Take The DuVernay Test for ${title} -- rate it based on racial representation!`;
        const SocialUrl = `https://${req.hostname}${req.url}`;

        ogTags = `
        <meta property="og:title" content="${SocialTitle}" />
        <meta property="og:description" content="${SocialDescription}" />
        <meta property="og:url" content="${SocialUrl}" />
        <meta property="og:image" content="${image}" />
        `;
    }

    const s1 = new Readable();

    s1.push(`
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        
        <title>The DuVernay Test</title>
        
        ${ogTags}
        
        <link href="/public/foundation.css" rel="stylesheet">
        <link href="/public/font-awesome.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Inconsolata|Karla|Montserrat:400,700,900" rel="stylesheet"> 
        <link href="/public/webapp.css" rel="stylesheet">
        
        <link rel="apple-touch-icon" sizes="57x57" href="/public/favicon/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/public/favicon/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/public/favicon/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/public/favicon/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/public/favicon/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/public/favicon/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/public/favicon/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/public/favicon/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/public/favicon/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="/public/favicon/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/public/favicon/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon/favicon-16x16.png">
        <link rel="manifest" href="/public/favicon/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="/public/favicon/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">
        
        <script>
            window.envGaId = '${envGaId}';
            window.envFacebookClientId = '${envFacebookClientId}';
            window.envGoogleReCaptchaSitekey = '${envGoogleReCaptchaSitekey}';
            window.isGoogleReCaptchaEnabled = ${isGoogleReCaptchaEnabled};
        </script>
    </head>
    <body>
        <div id="webapp">`);
    s1.push(null);
    s1.pipe(res, {end: false});
    s1.on('end', () => {
        const s2 = ReactDOMServer.renderToNodeStream(webapp(req.url));
        s2.pipe(res, {end: false});
        s2.on('end', () => {
            const s3 = new Readable();

            s3.push(`</div>
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
        <script src="https://www.google.com/recaptcha/api.js?onload=recaptchaOnLoadCallback&render=explicit" async defer></script>
        <script src="/public/webapp.bundle.js"></script>
    </body>
</html>
            `);
            s3.push(null);
            s3.pipe(res);
        });
    });
}

if (sslOptions.cert && sslOptions.key) {
    https.createServer(sslOptions, app).listen(4443,function () {
        console.log('web app listening on port 4443!')
    });

    http.createServer(function (req: any, res: any) {
        res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
        res.end();
    }).listen(4000, function () {
        console.log('web app listening on port 4000 and redirecting to https!')
    });
} else {
    app.listen(4000,function () {
        console.log('web app listening on port 4000!')
    });
}
