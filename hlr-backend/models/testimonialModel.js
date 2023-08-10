const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Set unique constraint for userId
    },
    title: { type: String, required: true },
    feedback: { type: String, required: true },
    ratings: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamp: true, versionKey: false }
);

// Pre middleware to populate the userAvatar field from the User model
testimonialSchema.pre("findOne", async function (next) {
  try {
    // 'this' refers to the testimonial being queried
    const user = await mongoose.model("User").findOne({ _id: this.userId });
    if (user) {
      this.userName = user.name; // Add userName field if needed
      this.userAvatar = user.avatar;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = Testimonial;
