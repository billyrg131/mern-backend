const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./models/Students');

const app = express();
app.use(express.json());
app.use(cors());

const uri =
	'mongodb+srv://user123:Password123%23@cluster0.pqgobar.mongodb.net/mern2?retryWrites=true&w=majority&appName=Cluster0';

mongoose.set('strictQuery', false);
mongoose.connect(uri, {
	useNewUrlParser: true,
});
app.get('/read', (req, res) => {
	StudentModel.find({}, (err, result) => {
		if (err) {
			res.send(err);
		}
		res.send(result);
	});
});
app.post('/insert', async (req, res) => {
	const user = req.body;
	const studentName = user.studentName;
	const phoneNumber = user.phoneNumber;
	const email = user.email;
	const classGroup = user.classGroup;
	const dateOfBirth = user.dateOfBirth;
	const student = new StudentModel({
		studentName: studentName,
		phoneNumber: phoneNumber,
		email: email,
		classGroup: classGroup,
		dateOfBirth: dateOfBirth,
	});
	try {
		await student.save();
		res.send('inserted data');
	} catch (err) {
		console.log(err);
	}
});
app.put('/update', async (req, res) => {
	const user = req.body;
	const id = user.id;
	const newEmail = user.newEmail;
	const newPhone = user.newPhone;
	const newClass = user.newClass;
	try {
		await StudentModel.findById(id, (err, updatedStudent) => {
			updatedStudent.phoneNumber = newPhone;
			updatedStudent.email = newEmail;
			updatedStudent.classGroup = newClass;
			updatedStudent.save();
			res.send('Updated');
		});
	} catch (err) {
		console.log(err);
	}
});

app.delete('/delete/:id', async (req, res) => {
	const id = req.params.id;
	await StudentModel.findByIdAndRemove(id).exec();
	res.send('deleted');
});
app.listen(3001, () => {
	console.log('Server is listening');
});
