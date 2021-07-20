window.onload = async () => {
    const spec = '{{spec}}';

    const csrfTokenResponse = await fetch('/api/auth/token');

    let csrfToken = csrfTokenResponse.headers.get('xsrf-token');

    const ui = SwaggerUIBundle({
        spec,
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        plugins: [SwaggerUIBundle.plugins.DownloadUrl],
        layout: 'StandaloneLayout',
        requestInterceptor: req => {
            if (csrfToken) {
                req.headers['xsrf-token'] = csrfToken;
            }

            return req;
        },
        responseInterceptor: res => {
            csrfToken = res.headers['xsrf-token'];

            return res;
        }
    });

    window.ui = ui;
};
