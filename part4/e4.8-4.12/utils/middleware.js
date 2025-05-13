import logger from "./logger.js";

const errorHandler = (error, request, response, next) => {
    if(error.name === 'ValidationError') {
        response.status(400).send(error.message)
    } else if (error.name === 'CastError') {
      response.status(400).send('Malformatted ID')
    } else {
        response.status(400).send('Oops, Something Not Right')
    }
    next(error);
}

const requestLogger = (request, response, next) => {
    logger.info('---Request Details---')
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body || null)
    logger.info('--- End ----')
    next()
  }
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  

export  { errorHandler, requestLogger, unknownEndpoint }