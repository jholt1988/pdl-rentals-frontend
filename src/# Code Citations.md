# Code Citations

## License: unknown
https://github.com/XayalXudiyev/MERN/tree/66999f868bab75132f17bd09b98530d6b171bcf4/server/middlewares/auth.js

```
) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
```

