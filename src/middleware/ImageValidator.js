const imageValidate = (req, res, next) => {
  const expectedFileType = ['png', 'jpg', 'jpeg'];
  if (!req.file) {
    return res.status(400).json({message: 'Image is Required'});
  }
  const fileExtension = req.file.mimetype.split('/').pop();
  if (!expectedFileType.includes(fileExtension)) {
    return res.status(400).json({message: 'Image is not valid'});
  }
  next();
};

const imageValidateUpdate = (req, res, next) => {
  if (req.file) {
    const expectedFileType = ['png', 'jpg', 'jpeg'];
    const fileExtension = req.file.mimetype.split('/').pop();
    if (!expectedFileType.includes(fileExtension)) {
      return res.status(400).json({message: 'Image is not valid'});
    }
    next();
  }
  next();
};

module.exports = {imageValidate, imageValidateUpdate};
