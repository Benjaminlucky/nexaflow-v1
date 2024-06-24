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

  // Validate phone number format
  const phoneNumberRegex = /^0(80|70|90|81|91)[0-9]{8}$/;
  if (!phoneNumberRegex.test(phoneNumber)) {
    return res.status(400).json({
      message:
        "Invalid phone number format. Phone number must be 11 digits and start with 080, 070, 090, 081, or 091.",
    });
  }

  //validation

  if (!firstName) {
    return res.status(400).json({ message: "Please fill your First Name" });
  }
  if (!lastName) {
    return res.status(400).json({ message: "Please fill your Last Name" });
  }
  if (!username) {
    return res.status(400).json({ message: "Please fill your username" });
  }
  if (!emailAddress) {
    return res.status(400).json({ message: "Please fill your Email Address" });
  }
  if (!phoneNumber) {
    return res.status(400).json({ message: "Please fill your Phone Number" });
  }
  if (!bankName) {
    return res.status(400).json({ message: "Please fill your Bank Name" });
  }
  if (!bankAccountNumber) {
    return res
      .status(400)
      .json({ message: "Please fill your Bank Account Number" });
  }
  if (!bankAccountName) {
    return res
      .status(400)
      .json({ message: "Please fill your Bank Account Name" });
  }
  if (!password) {
    return res.status(400).json({ message: "Please fill your Password" });
  }

  try {
    // check if username, email, or phone number and bank account number already exists

    const existingRealtorUsername = await Realtor.findOne({
      username: username,
    });
    const existingRealtoremail = await Realtor.findOne({
      emailAddress: emailAddress,
    });

    const existingRealtorPhoneNumber = await Realtor.findOne({
      phoneNumber: phoneNumber,
    });

    const existingRealtorAccountNumber = await Realtor.findOne({
      bankAccountNumber: bankAccountNumber,
    });

    //Validate if username is in Use Already
    if (existingRealtorUsername) {
      return res.status(400).json({ message: "Username is already in use" });
    }

    // Validate if Email is in Use Already
    if (existingRealtoremail) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    //validate if Phone number is in Use Already
    if (existingRealtorPhoneNumber) {
      return res
        .status(400)
        .json({ message: "Phone number is already in use" });
    }

    // validate if bank account number is in use Already
    if (existingRealtorAccountNumber) {
      return res
        .status(400)
        .json({ message: "Bank Account Number already in use" });
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
    return res.status(201).json({ message: "Realtor registered successfully" });
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

    if (emailAddress === "") {
      return res
        .status(401)
        .json({ message: "Please enter your email address" });
    }

    if (password === "") {
      return res.status(401).json({ message: "Please enter your password" });
    }

    // Validate if Realtor Exist
    const existingRealtor = await Realtor.findOne({ emailAddress });
    if (!existingRealtor) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //validate Realtor Password
    const validPassword = bcryptjs.compareSync(
      password,
      existingRealtor.password
    );
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
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
    console.error("error signing in", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
