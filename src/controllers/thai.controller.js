const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { thaiService } = require('../services');

const createThai = catchAsync(async (req, res) => {
  const thai = await thaiService.createThai(req.body);
  res.status(httpStatus.CREATED).send(thai);
});

const getThais = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await thaiService.queryThais(filter, options);
  res.send(result);
});

const getThai = catchAsync(async (req, res) => {
  const thai = await thaiService.getThaiById(req.params.thaiId);
  if (!thai) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thai not found');
  }
  res.send(thai);
});

const updateThai = catchAsync(async (req, res) => {
  const thai = await thaiService.updateThaiById(req.params.thaiId, req.body);
  res.send(thai);
});

const deleteThai = catchAsync(async (req, res) => {
  await thaiService.deleteThaiById(req.params.thaiId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createThai,
  getThais,
  getThai,
  updateThai,
  deleteThai,
};
