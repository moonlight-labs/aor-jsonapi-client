class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
        this.stack = new Error().stack;
    }
}

const fetchJson = (url, options = {}) => {
    const requestHeaders = options.headers || new Headers({
        'Accept': 'application/vnd.api+json',
    });
    if (!(options && options.body && options.body instanceof FormData)) {
        requestHeaders.set('Content-Type', 'application/vnd.api+json');
    }
    if (options.user && options.user.authenticated && options.user.token) {
        requestHeaders.set('Authorization', options.user.token);
    }
    return fetch(url, { ...options, headers: requestHeaders })
        .then(response => response.text().then(text => ({
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: text,
        })))
        .then(({ status, statusText, headers, body }) => {
            let json;
            try {
                json = JSON.parse(body);
            } catch (e) {
                // not json, no big deal
            }
            if (status < 200 || status >= 300) {
                return Promise.reject(new HttpError((json && json.message) || statusText, status));
            }
            return { status, headers, body, json };
        });
};

export default (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ 'Accept': 'application/vnd.api+json' });
    }
    // add your own headers here
    options.headers.set('Content-Type', 'application/vnd.api+json');