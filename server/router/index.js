const express = require('express');
const authRoutes = require('./auth');
const projectsRoutes = require('./projects');

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/projects', projectsRoutes);

module.exports = apiRouter;
