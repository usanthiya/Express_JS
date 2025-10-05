/***
 *here only requests from the whitelist will work; all others will throw a CORS error.
 callback(error, allow) is used to:
   - callback(null, true) → allow the request.
   - callback(new Error('Not allowed by CORS')) → block the request.
 */

const whiteList = ["https://www.website.com", "http://127.0.0.1:3500", "http://localhost:3500"];
const corsOptions = {
  origin: (origin, callback) => {
    console.log("Request Origin:", origin);
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
