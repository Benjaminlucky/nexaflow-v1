import Realtor from "../models/realtor.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const realtorSignup = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    emailAddress,
    phoneNumber,
    referredBy,
    bankName,
    bankAccountNumber,
    bankAccountName,
    password,
  } = req.body;

  //validation

  if (
    !firstName ||
    !lastName ||
    !username ||
    !emailAddress ||
    !phoneNumber ||
    !bankName ||
    !bankAccountNumber ||
    !bankAccountName ||
    !password
  ) {
    return res.status(400).json({ message: "All fields must be filled" });
  }

  try {
    // check if username, email, or phone number already exists

    const existingRealtor = await Realtor.findOne({
      $or: [
        {
          username: username,
        },
        {
          emailAddress: emailAddress,
        },
        {
          phoneNumber: phoneNumber,
        },
      ],
    });

    if (existingRealtor) {
      return res
        .status(400)
        .json({ message: "username, email, or phone number already in use" });
    }

    // Hash the password

    const hashedPassword = await bcryptjs.hash(password, 10);

    // create the new realtor

    const newRealtor = new Realtor({
      firstName,
      lastName,
      username,
      emailAddress,
      phoneNumber,
      referredBy,
      bankName,
      bankAccountNumber,
      bankAccountName,
      password: hashedPassword,
    });

    // handle referral logic

    if (referredBy) {
      const referral = await Realtor.findOne({ username: referredBy });

      if (referral) {
        newRealtor.referredBy = referral._id;
        referral.referrals.push(newRealtor._id);
        await referral.save();
      }
    }

    // save the new realtor
    await newRealtor.save();
    res.status(201).json({ message: "Realtor registered successfully" });
  } catch (error) {
    console.error("error signing up", error);
    res.status(500).json({ error: "internal server error" });
  }
};

export default realtorSignup;

export const realtorSignin = async (req, res) => {
  try {
    //get login credentials from body
    const { emailAddress, password } = req.body;

    // Validate if Realtor Exist
    const existingRealtor = await Realtor.findOne({ emailAddress });
    if (!existingRealtor) {
      return res.status(401).json({ Message: "Invalid Credentials" });
    }

    //validate Realtor Password
    const validPassword = bcryptjs.compareSync(
      password,
      existingRealtor.password
    );
    if (!validPassword) {
      return res.status(401).json({ Message: "Invalid Credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: existingRealtor._id, emailAddress: existingRealtor.emailAddress },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Sign in successful",
      realtor: {
        id: existingRealtor._id,
        firstName: existingRealtor.firstName,
        lastName: existingRealtor.lastName,
        emailAddress: existingRealtor.emailAddress,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ Message: "Server Error" });
  }
};
