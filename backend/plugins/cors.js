const cors = require('cors');
const {
    app: { corsSites, frontendUrl }
} = require('../config');

module.exports = app => {
    const corsAllowedSites = corsSites.map(site => site.url.trim());

    const originsWhitelist = [frontendUrl, ...corsAllowedSites];

    const corsOptions = {
        origin(origin, callback) {
            if (originsWhitelist.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        exposedHeaders: ['cluid', 'xsrf-token', 'version']
    };

    app.use(cors(corsOptions));
};
