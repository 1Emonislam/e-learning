const { cloudinary } = require('../config/cloudinary');

/**
 * Check file is an image or not
 *
 * @param {File} file File object
 */
const imageCheck = (images) => {
	for (const image of images) {
		if (image.type) {
			const isImage = image.type.startsWith("image/");
			if (!isImage) {
				return false;
			}
		} else {
			throw new Error(`${image.fieldName} field is empty!`);
		}
	}

	return true;
};

/**
 * Upload a file
 *
 * @param {string} filePath Path of the file
 * @returns promise
 */
const upload = async (filePath) => {
	return await cloudinary.uploader.upload(filePath);
};
const fileUpload = async (filePath) => {
	return await cloudinary.uploader.upload(filePath, {
		resource_type: 'auto'
	});
};

module.exports = { imageCheck, upload,fileUpload };