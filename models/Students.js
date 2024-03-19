const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
	studentName: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	classGroup: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
});

const StudentModel = mongoose.model('users', StudentSchema);

module.exports = StudentModel;
