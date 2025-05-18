
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");


//create a database connection -> u can also
//create a separate file for this and then import/use that file here

// mongoose
//   .connect('mongodb+srv://testvikas:test%40123@newtest.nybnwpu.mongodb.net/')
//   .then(() => console.log("MongoDB connected"));
// const MONGO_URI = encodeURIComponent(process.env.MONGODB_PASSWORD);
// console.log(process.env.DOCKER_PASSWORD, "jdjgdgjg")
// const dockerpassword = process.env.MONGODB_PASSWORD;
// console.log(dockerpassword,"dockerpassword")

// console.log("password",password)

const MONGO_URI = `mongodb+srv://testEcommerce:Vikas%40123@ecommercetest.cdald5n.mongodb.net/?retryWrites=true&w=majority&appName=EcommerceTest`;

const PORT =  5000;
console.log(MONGO_URI, "MONGO_URI")
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();



app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});




app.use(
  cors({
    origin: "http://3.108.54.244",
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

const apiRoutes = [
  { path: "/api/auth", router: authRouter },
  { path: "/api/admin/products", router: adminProductsRouter },
  { path: "/api/admin/orders", router: adminOrderRouter },
  { path: "/api/shop/products", router: shopProductsRouter },
  { path: "/api/shop/cart", router: shopCartRouter },
  { path: "/api/shop/address", router: shopAddressRouter },
  { path: "/api/shop/order", router: shopOrderRouter },
  { path: "/api/shop/search", router: shopSearchRouter },
  { path: "/api/shop/review", router: shopReviewRouter },
  { path: "/api/common/feature", router: commonFeatureRouter },
];

apiRoutes.forEach((route) => {
  app.use(route.path, route.router);
});





app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

