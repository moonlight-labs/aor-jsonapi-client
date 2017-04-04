import { queryParameters, jsonApiHttpClient } from './fetch';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
} from './types';

/**
 * Maps admin-on-rest queries to JSON API
 */

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
            //don't deal with filter, assume sort only gets one field specified for now
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            var query = {
                'page[offset]': (page - 1) * perPage,
                'page[limit]': perPage,
            };
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
            // const ids = params.ids;
            // const query = {filter: ids.toString()};
            // url = `${apiUrl}/${resource}?${queryParameters(query)}`;
            break;
        case GET_MANY_REFERENCE: 
            break;
        case UPDATE:
            url = `${apiUrl}/${resource}/${params.id}`;
            options.method = 'PATCH';
            const updateParams = {type: resource, id: params.id, attributes: params.data}
            options.body = JSON.stringify(updateParams);
            break;
        case CREATE:
            url = `${apiUrl}/${resource}`;
            options.method = 'PUT';
            const createParams = {type: resource, attributes: params.data, }
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
        console.log(headers);
        switch (type) {
        case GET_LIST: 
            // incorrect way of calculating total. 
            return {data: json.data, total: json.data.length};
        case GET_MANY_REFERENCE: 
            return ;
        case UPDATE:
        case CREATE:
            return { data: Object.assign({id: json.data.id}, json.data.attributes) };
        case DELETE:
            //does JSON API return the deleted object?
            return { data: json};
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
