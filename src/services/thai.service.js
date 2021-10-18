const httpStatus = require('http-status');
const { Thai } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a thai
 * @param {Object} thaiBody
 * @returns {Promise<Thai>}
 */
const createThai = async (thaiBody) => {
  return Thai.create(thaiBody);
};

/**
 * Query for thais
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryThais = async (filter, options) => {
  const thais = await Thai.paginate(filter, options);
  return thais;
};

/**
 * Get thai by id
 * @param {ObjectId} id
 * @returns {Promise<Thai>}
 */
const getThaiById = async (id) => {
  return Thai.findById(id);
};

/**
 * Get thai by email
 * @param {string} email
 * @returns {Promise<Thai>}
 */
const getThaiByEmail = async (email) => {
  return Thai.findOne({ email });
};

/**
 * Update thai by id
 * @param {ObjectId} thaiId
 * @param {Object} updateBody
 * @returns {Promise<Thai>}
 */
const updateThaiById = async (thaiId, updateBody) => {
  const thai = await getThaiById(thaiId);
  if (!thai) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thai not found');
  }
  if (updateBody.email && (await Thai.isEmailTaken(updateBody.email, thaiId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(thai, updateBody);
  await thai.save();
  return thai;
};

/**
 * Delete thai by id
 * @param {ObjectId} thaiId
 * @returns {Promise<Thai>}
 */
const deleteThaiById = async (thaiId) => {
  const thai = await getThaiById(thaiId);
  if (!thai) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Thai not found');
  }
  await thai.remove();
  return thai;
};

module.exports = {
  createThai,
  queryThais,
  getThaiById,
  getThaiByEmail,
  updateThaiById,
  deleteThaiById,
};
