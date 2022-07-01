const Request = require('../models/request');

const createRequest = async (request) => {
    const newRequest = await Request.create(request);
    return newRequest;
}

const queryRequest = async (filter, options) => {
    filter.deleted = false; // filter out deleted users
    const requests = await Request.paginate(filter, options);
    return requests;
}

const getRequestById = async (id) => {
    return await Request.findById(id);
}

const updateRequestById = async (id, requestUpdate) => {
    const request = await getRequestById(id);
    Object.assign(request, requestUpdate);
    await request.save();
    return request;
}

const updateRequestStatusById = async (id, status) => {
    const request = await getRequestById(id);
    request.status = status;
    await request.save();
    return request;
}

module.exports = {
    createRequest,
    queryRequest,
    getRequestById,
    updateRequestById,
    updateRequestStatusById
}