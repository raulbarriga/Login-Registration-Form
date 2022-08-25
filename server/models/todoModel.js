import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  todo: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
});

export default mongoose.model("TodoData", TodoSchema);