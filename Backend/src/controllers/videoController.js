import mongoose, { isValidObjectId } from 'mongoose';
import { Video } from '../models/videoModels.js';
import { User } from '../models/userModels.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

  const pageNumber = Math.max(1, parseInt(page, 10));
  const pageSize = Math.max(1, parseInt(limit, 10));
  const skip = (pageNumber - 1) * pageSize;

  // Build the search filter
  const filter = {};
  if (query) {
    filter.title = { $regex: query, $options: 'i' }; // Case-insensitive search by title
  }
  if (userId && isValidObjectId(userId)) {
    filter.userId = userId; // Filter by userId if valid
  }

  // Build sorting options
  const sortOption = {};
  sortOption[sortBy] = sortType === 'asc' ? 1 : -1;

  // Fetch videos from the database
  const [videos, totalCount] = await Promise.all([
    Video.find(filter).sort(sortOption).skip(skip).limit(pageSize),
    Video.countDocuments(filter),
  ]);

  // Calculate pagination details
  const totalPages = Math.ceil(totalCount / pageSize);

  if (!videos || videos.length === 0) {
    return res.status(404).json(
      new ApiResponse({
        data: [],
        meta: {
          total: totalCount,
          page: pageNumber,
          pages: totalPages,
          limit: pageSize,
        },
        message: 'No videos found',
        success: true,  // Ensure success is set to true even in the case of no data
      })
    );
  }

  // Send response with videos
  return res.status(200).json(
    new ApiResponse({
      data: videos,
      meta: {
        total: totalCount,
        page: pageNumber,
        pages: totalPages,
        limit: pageSize,
      },
      message: 'Videos fetched successfully',
      success: true, // Ensure success is set to true
    })
  );
});


const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video

//   console.log(req.files);
  
  const videoLocalPath = req.files?.videoFile[0]?.path;
  console.log(videoLocalPath);
  
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
    // console.log(thumbnailLocalPath);

  if (!videoLocalPath || !thumbnailLocalPath) {
    throw new ApiError(400, 'Please provide video file and thumbnail');
  }

  const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

  const videoFile = await uploadOnCloudinary(videoLocalPath);
//   console.log(videoFile);
  

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!videoFile || !thumbnail) {
    throw new ApiError(400, 'video file or thumbnail is required');
  }

  const video = await Video.create({
    title,
    description,
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    owner: req.user._id,
    views: 0,
    isPublished: false,
  });

  video.isPublished = true;
  await video.save();

  return res.status(201)
  .json(new ApiResponse({ data: video, message: 'Video uploaded successfully' }));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, 'Invalid video ID');
  }

  // Find the video by ID
  const video = await Video.findById(videoId);

  // Check if the video exists
  if (!video) {
    throw new ApiError(404, 'Video not found');
  }

  // Return the video in the response
  return res.status(200).json(
    new ApiResponse({
      data: video,
      message: 'Video fetched successfully',
    })
  );
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;
  const thumbnail = req.file?.path;
  console.log(req.body);
  
  //TODO: update video details like title, description, thumbnail

    if (!isValidObjectId(videoId)) {
    throw new ApiError(400, 'Invalid video ID');
    }

    const video = await Video.findById(videoId);
    console.log(video);
    

    if (!video) {
    throw new ApiError(404, 'Video not found');
    }

    const videoUplaod = await uploadOnCloudinary(req.file.path);
    console.log("uploaded", videoUplaod);

    if (!videoUplaod) {
    throw new ApiError(400, 'video file or thumbnail is required');
    }

    const updatedVideo = await Video.findByIdAndUpdate(
        req.params.videoId,
        {
            $set: {
                title,
                description,
                thumbnail: thumbnail.url,
            },
        },
        { new: true }
    )

    return res.status(200).json(
        new ApiResponse({
            data: updatedVideo,
            message: 'Video updated successfully',
        })
    )
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, 'Invalid video ID');
  }
  const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, 'Video not found');
    }

   const deletedVideo = await Video.findByIdAndDelete(videoId);

   if(!deletedVideo){
       throw new ApiError(500, 'Video could not be deleted');
   }

    return res.status(200).json(
         new ApiResponse({
              data: deletedVideo,
              message: 'Video deleted successfully',
         })
    );

});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle publish status of video
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, 'Invalid video ID');
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, 'Video not found');
    }

    video.isPublished = !video.isPublished;

    await video.save();

    return res.status(200).json(
        new ApiResponse({
            data: video,
            message: 'Video publish status updated successfully',
        })
    );

});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
