const { catchAsyncErrors } = require('../middleware/catchAsyncError')
const User = require('../models/userModel')
const ErrorHandler = require('../utils/ErrorHandler')

exports.createContact = catchAsyncErrors(async (req, res, next) => {
    try {
        console.log(req.body)
        const { firstName, lastName, status } = req.body;
        const newUser = new User({
            firstName,
            lastName,
            status
        });
        const savedUser = await newUser.save();
        res.status(201).json({
            status: 'success',
            data:newUser,})

    } catch (error){
        return next(error);
    }
});

exports.viewContact=catchAsyncErrors(async(req,res,next)=>{
    try {
        const allcontacts=await User.find()
        res.status(201).json({
            status: 'success',
            data: allcontacts
        })
    } catch (error) {
        return next(error);
    }  
})

exports.updateContact = catchAsyncErrors(async (req, res, next) => {
    try {
        const userId = req.params.id; // Assuming the ID is passed in the request params
        const { firstName,lastName,status} = req.body;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.status = status || user.status;
        const updatedUser = await user.save();
        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser
            }
        });
    } catch (error) {
        return next(error);
    }
});

exports.deleteContact = catchAsyncErrors(async (req, res, next) => {
    try {
        const userId = req.params.id; // Assuming the ID is passed in the request params

        // Find the user by ID and delete it
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        // Respond with a success message
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        // Pass any caught errors to the error handling middleware
        return next(error);
    }
});