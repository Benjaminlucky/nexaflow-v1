import mongoose from "mongoose";

const realtorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // Adding required to ensure this field is not empty
    },
    lastName: {
      type: String,
      required: true, // Adding required to ensure this field is not empty
    },
    username: {
      type: String,
      unique: true,
      required: true, // Adding required to ensure this field is not empty
    },
    emailAddress: {
      type: String,
      unique: true,
      required: true, // Adding required to ensure this field is not empty
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Email format validation
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true, // Adding required to ensure this field is not empty
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Realtor",
    },
    referrals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Realtor",
      },
    ],
  },
  { timestamps: true }
);

const Realtor = mongoose.model("Realtor", realtorSchema);

export default Realtor;
