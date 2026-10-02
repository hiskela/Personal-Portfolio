import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    github: {
      type: String,
      default: "",
      trim: true,
    },
    linkedin: {
      type: String,
      default: "",
      trim: true,
    },
    cv: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      default: "Available for opportunities",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Home = mongoose.model("Home", homeSchema);

export default Home;