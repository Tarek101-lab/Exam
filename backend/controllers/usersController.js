import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "name, email and password are required" });
    }

    const existing = await User.findOne({ email: email });
    if (existing)
      return res
        .status(400)
        .json({ error: "Email already exists go to login page ..." });

    // password: 12345
    // hashed password: salt + password for example: 12345@#$%kjdlkjslkfjlskdf
    // saltRounds = 10: 12345@#$%kjdlkjslkfjlskdf hash(hash(hash(hash(...(password + salt))))

    const hashedPass = bcrypt.hashSync(password, saltRounds);
    const created = new User({
      name: name,
      email: email,
      password: hashedPass,
    });
    await created.save();

    const newUser = {
      id: created._id.toString(),
      name: created.name,
      email: created.email,
    };

    res.json({
      success: "true",
      message: "User created successfully",
      newUser,
    }); // if i return created it will return the hashed password which is wrong
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to register user" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ error: `User with email does not exist!!` });
    }

    const authentication = bcrypt.compareSync(password, user.password);
    if (!authentication) return res.status(401).send("Invalid credentials");

    const safeUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign({ user: safeUser }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token: token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to login" });
  }
}
