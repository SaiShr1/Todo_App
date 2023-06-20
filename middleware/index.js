function logger(req, res, next)

// Here we are adding a new property to the request object
{
    console.log("New Request: ", new Date().toLocaleString(), ", Method: ", req.method, ", URL: " + req.url)
    req.randomKey = "This is random key"
    next()
}

// Here we are checking if the user is authenticated or not
function isAuthenticated(req, res, next)

{

    // If the user is not authenticated then we are redirecting the user to login page
if(!req.headers.authorization || req.headers.authorization === "null"  ) {
    return res.status(200)
    .json({ 
        redirect: true
    })
}
next()
}

// Exporting the logger and isAuthenticated functions
module.exports = {
logger,
isAuthenticated
}