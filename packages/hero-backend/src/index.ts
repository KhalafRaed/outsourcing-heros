import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import cors from "cors"; // Import the cors package
import cookieParser from "cookie-parser";

const app = express();
const port = 3001;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4200",
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
    credentials: true,
  }),
);

const users: {
  [key: string]: { email: string; password: string; powerName: string };
} = {};

app.post("/register", (req, res) => {
  setTimeout(() => {
    const { email, password, powerName } = req.body;
    users[email] = { email, password, powerName };
    const accessToken = jwt.sign({ email }, "secret");
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: false,
    });
    res.send({ email, powerName });
  }, 1000);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users[email];
  if (!user || user.password !== password) {
    setTimeout(() => {
      res.status(401).send("Invalid email or password");
    }, 1000);
  } else {
    setTimeout(() => {
      const accessToken = jwt.sign({ email }, "secret");
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: false,
      });
      res.send({ email, powerName: user.powerName });
    }, 1000);
  }
});

const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).send("Access token is required");
  }

  jwt.verify(token, "secret", (err: any, user: any) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
};

app.use(cookieParser());
app.use(authenticateToken);

app.get("/check-auth", (req, res) => {
  res.send({});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
