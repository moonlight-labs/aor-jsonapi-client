/* eslint-disable */
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
} from './types';

import {jsonApiHttpClient, queryParameters } from './fetch';

export default (apiUrl, httpClient = jsonApiHttpClient) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertRESTRequestToHTTP = (type, resource, params) => {
        let url = '';
        const options = {};
        switch (type) {
        case GET_LIST:
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const { name, value } = params.filter;
            var query = {
                'page[offset]': (page - 1) * perPage,
                'page[limit]': perPage, 
            };
            Object.keys(params.filter).forEach(key =>{
                var filterField = 'filter[' + key +']';
                query[filterField] = params.filter[key];
            })
            if (order === 'ASC'){
                query.sort = field;
            }else{
                query.sort = '-' + field;
            }
            url = `${apiUrl}/${resource}?${queryParameters(query)}`;
            break;
        case GET_ONE:
            url = `${apiUrl}/${resource}/${params.id}`;
            break;
        case GET_MANY:
            const query = {'filter[id]': params.ids.toString() };
            url = `${apiUrl}/${resource}?${queryParameters(query)}`;
            break;
        case GET_MANY_REFERENCE: 

            break;
        case UPDATE:
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'PATCH';
            var attrs = {};
            Object.keys(params.data.attributes).forEach(key => attrs[key] = params.data[key]);
            const updateParams = {data:{type: resource, id: params.id, attributes: attrs}};
            options.body = JSON.stringify(updateParams);
            break;
        case CREATE:
            url = `${apiUrl}/${resource}`;
            options.method = 'POST';
            const createParams = {data: {type: resource, attributes: params.data }};
            options.body = JSON.stringify(createParams);
            break;
        case DELETE:
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'DELETE';
            break;
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
        }
        return { url, options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    const convertHTTPResponseToREST = (response, type, resource, params) => {
        const { headers, json } = response;
        switch (type) {
        case GET_LIST: 
            const jsonData = json.data.map(dic => Object.assign({id: dic.id}, dic.attributes));
            return {data: jsonData, total: json.meta['record-count']};
        case GET_MANY_REFERENCE: 
            return ;
        case UPDATE:
        case CREATE:
            return { data: Object.assign({id: json.data.id}, json.data.attributes) };
        case DELETE:
            return {data: json}
        default:
            return {data:json.data};
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return (type, resource, params) => {
        const { url, options } = convertRESTRequestToHTTP(type, resource, params);
        return httpClient(url, options)
            .then(response => convertHTTPResponseToREST(response, type, resource, params));
    };
};

