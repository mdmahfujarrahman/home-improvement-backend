import multer from "multer";

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "");
    },
});

export const uploadMedia = multer({ storage });


