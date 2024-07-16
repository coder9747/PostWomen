import express from "express";
import cors from "cors";

const app = express();
const PORT = 20000;

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Proxy endpoint
app.use("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({
      succes: false,
      message: "Missing url",
    });
  }

  try {
    // Prepare the options for the fetch request
    const fetchOptions = {
      method: req.method,
      headers: { ...req.headers }, // Pass all headers from the original request
    };
    delete fetchOptions.headers["content-length"];
    // If the request is not GET and there's a body, include it in fetchOptions
    if (req.method !== "GET" && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }
    // Fetch the target URL
    let startTime = Date.now();
    const response = await fetch(targetUrl, fetchOptions);
    // Calculate response time
    const responseTime = Date.now() - startTime;

    // Extract content type from response headers
    const contentType = response.headers.get("content-type");

    let body;

    // Handle different content types
    if (contentType.includes("application/json")) {
      body = await response.json(); // Parse JSON response
    } else if (contentType.includes("text/")) {
      body = await response.text(); // Get text response
    } else if (contentType.includes("image/")) {
      const buffer = await response.buffer(); // Get image as buffer
      body = buffer.toString("base64"); // Convert buffer to base64 string
    } else {
      body = await response.text(); // Default to text response
    }

    // Send back the response with the appropriate content type
    res.json({
      succes: true,
      responseType: contentType.split(";")[0], // Extract main content type
      responseTime,
      body,
    });
  } catch (error) {
    res.status(500).send({
      succes: false,
      message: error.message,
    });
  }
});

app.use("/test",(req,res)=>res.json({succes:true,message:"Server Is Healthy"}));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong.");
});





app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});

