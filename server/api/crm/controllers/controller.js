let logger = require(`${process.cwd()}/server/utils/logger`);
// get an instance of the model of our db
let model = require('../model');

let bcrypt = require('bcrypt');
const saltRounds = 10;


exports.getCustomer = function(req, res, next) {
    logger.log("--- CONTROLLER : get");
    // find() function of the model thanks to Mongoose [cf : http://mongoosejs.com/docs/queries.html]
    model.Customer.find()
    // once the query is done, do the following action thanks to a "promise"
    .then(function(docs){
        logger.log(docs);
        res.json(docs);
    });
};

exports.postCustomer = function(req, res, next) {
    logger.log("--- CONTROLLER : post");
    
    // we create a new model with the data to add to the db
    let customer = new model.Customer(req.body);

    bcrypt.hash(customer.contactPerson.pwd, saltRounds, function(err, hash) { 
        logger.log(customer.contactPerson.pwd);
        logger.log(hash);
        customer.contactPerson.pwd = hash;
        // and add it to the db
        customer.save(function(err, data) {
            let message = {
                message: 'Document saved'
            };
            if (err) {
                message.message = err.message;
            }
            logger.log(message);
            res.json(message);
        });
    });
};

exports.updateCustomer = function(req, res, next) {
    logger.log("--- CONTROLLER : Update");
    
    // update the data corresponding to the id with the new one in the request
    model.Customer.findByIdAndUpdate(req.params.id, req.body, 
        function(err, doc) {
            let message = {
                message: 'Document upated'
            };
            if (err) {
                message.message = err.message;
            }
            logger.log(message);
            res.json(message);
        }
    );
};

exports.deleteById = function(req, res, next) {
    logger.log("--- CONTROLLER : deleteById");
    
    // get id from the parameters sent in the url
    model.Customer.findByIdAndRemove(req.params.id,
        function(err, doc) {
            let message = {
                message: 'Document removed'
            };
            if (err) {
                message.message = err.message;
            }
            logger.log(message);
            res.json(message);
        }
    );
}

exports.dynamicSearch = function(req, res, next) {
    logger.log("--- CONTROLLER : dynamicSearch");

    let query = req.query;
    logger.log(req.query);
    model.Customer.find(query)
    .then(function(docs){
        // the result is not empty we have a corresponding result
        if(docs.length) {
            logger.log(docs);
            res.json(docs);
        } else {
            logger.log({message:`No result for the query ${JSON.stringify(query)}`});
            res.json({message:`No result for the query ${JSON.stringify(query)}`});
        }
    });
};

exports.getAdmin = function(req, res, next) {
    logger.log("--- CONTROLLER : get");
    // find() function of the model thanks to Mongoose [cf : http://mongoosejs.com/docs/queries.html]
    model.find()
    // once the query is done, do the following action thanks to a "promise"
    .then(function(docs){
        logger.log(docs);
        res.json(docs);
    });
};

exports.updateAdmin = function(req, res, next) {
    logger.log("--- CONTROLLER : Update")
    
    // update the data corresponding to the id with the new one in the request
    model.findByIdAndUpdate(req.params.id, req.body, 
        function(err, doc) {
            let message = {
                message: 'Document upated'
            };
            if (err) {
                message.message = err.message;
            }
            logger.log(message);
            res.json(message);
        }
    );
};

exports.getParams = function(req, res, next) {
    logger.log("--- CONTROLLER : get");
    // find() function of the model thanks to Mongoose [cf : http://mongoosejs.com/docs/queries.html]
    model.Param.find()
    // once the query is done, do the following action thanks to a "promise"
    .then(function(docs){
        logger.log(docs);
        res.json(docs);
    });
};