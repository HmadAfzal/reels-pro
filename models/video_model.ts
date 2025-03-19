import mongoose from "mongoose";

const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920
}
interface VideoInterface {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls: boolean;
    transformation: {
        width: number;
        height: number;
        quality?: number;
    }
    createdAt?: Date;
    updatedAt?: Date;
}


const VideoSchema = new mongoose.Schema<VideoInterface>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    controls: {
        type: Boolean,
        required: true,
        default: true
    },
    transformation: {
        height: {
            type: Number,
            required: true,
            default: VIDEO_DIMENSIONS.height
        },
        width: {
            type: Number,
            required: true,
            default: VIDEO_DIMENSIONS.width
        },
        quality: {
            type: Number,
            required: false,
            min: 1,
            max: 100
        },
    },
}, { timestamps: true });


export const Video = mongoose.models.Video || mongoose.model<VideoInterface>("Video", VideoSchema);