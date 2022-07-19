const REQUEST_STATUS = require('../const/requestStatus');
const REQUEST_TYPE = require('../const/requestType');
const services = require('../services');

const createRequest = async (req, res) => {
    try {
        const newRequest = {
            createdBy: req.user._id,
            updatedBy: req.user._id,
            equipmentId: req.body.equipmentId ? req.body.equipmentId : null,
            description: req.body.description ? req.body.description : null,
            status: req.body.status ? req.body.status : REQUEST_STATUS.PENDING,
            type: req.body.type ? req.body.type : REQUEST_TYPE.OTHER,
        }

        const request = await services.requestService.createRequest(newRequest);
        return res.status(200).json(request);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}


const getRequest = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const request = await services.requestService.getRequestById(id);
        if (!request) {
            return res.status(404).json({
                message: 'Request not found'
            });
        }
        return res.status(200).json(request);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const updateRequest = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let requestUpdate = {
            updatedBy: req.user._id,
            
        }
        if(req.body.description) requestUpdate.description = req.body.description;
        if(req.body.status) requestUpdate.status = req.body.status;
        if(req.body.type) requestUpdate.type = req.body.type;
        if(req.body.response) requestUpdate.response = req.body.response;
        const request = await services.requestService.updateRequestById(id, requestUpdate);
        if (!request) {
            return res.status(404).json({
                message: 'Request not found'
            });
        }
        return res.status(200).json(request);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const listRequest = async (req, res) => {
    try {
        const {
            page,
            limit,
            sort,
            order,
        } = req.query;
        const options = {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 10,
            sort:  {'createdAt': -1},
        }
        var filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        const requests = await services.requestService.queryRequest(filter, options);
        return res.status(200).json(requests);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}

const listMyRequest = async (req, res) => {
    try {
        const {
            page,
            limit,
            sort,
            order,
        } = req.query;
        const options = {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 10,
            sort: sort ? sort : 'createdAt',
            order: order ? order : 'desc',
        }
        var filter = req.query.filter ? JSON.parse(req.query.filter) : {};
        filter.createdBy = req.user._id;
        const requests = await services.requestService.queryRequest(filter, options);
        return res.status(200).json(requests);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }
}


const updateRequestStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;
        const request = await services.requestService.updateRequestStatusById(id, status);
        if (!request) {
            return res.status(404).json({
                message: 'Request not found'
            });
        }
        return res.status(200).json(request);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong',
        });
    }

}

module.exports = {
    createRequest,
    getRequest,
    updateRequest,
    listRequest,
    updateRequestStatus,
    listMyRequest
}