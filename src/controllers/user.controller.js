import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req , res ) =>{
    
    //algorithm for the user registration and validation
    //1.get user details from frontend
    //2validation :_ should not be empty
    //3check if user is already registered
    //4check for images . check for avatar images
    //5upload them to cloudinary
    //6create user and save entry to database (ENTRY IN DATABASE)
    //7remove password and refresh token field from response
    //8check for user creation
    // RETURN RESPONSE



    //1. get user details from frontend
    const {fullName, email, username, password } = req.body

    //2validation :_ should not be empty
    if([fullName, email, username, password].some((field) => field?.trim() === ""))
        {
            throw new ApiError( 400 , "All fields are required")
        }

    //3 check if user is already registered
    const existedUser = await User.findOne({
        $or : [{ username} , {email}]
    })
    

    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }


    //4check for images . check for avatar images
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImagePath = req.files?.coverImage[0].path;
    
    if(!avatarLocalPath) {
        throw new ApiError(400, "Please provide an avatar image")
    }
  
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImagePath)

    if(!avatar) {
        throw new ApiError(400 ,  "avatar file is required ")

    }
   
    // entry in database
    const user = await User.create({
        fullName ,
        avatar : avatar.url,
        coverImage : coverImage?.url || "" ,
        email,
        username : username.toLowerCase() , 
        password
    })

    
    //as mongodb gives a id to every entry we are finding that _id and modifying it
    //remove the password and refresh token 
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken" //string contains entry which we dont need in the database
    )

    // check for user creatinon
    if(!createdUser){
        throw new ApiError(500, "something went wrong while registring the user")
    }

    //returning response 
    return res.status(201).json(
        new ApiResponse(200 , createdUser ,  "user registered successfully")
    )





    
    












})


export {registerUser}