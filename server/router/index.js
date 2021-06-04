const express = require('express');
const authRoutes = require('./auth');
const projectRoutes = require('./project');

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/project', projectRoutes);

module.exports = apiRouter;
