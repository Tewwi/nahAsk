const imgType = {
  url: String,
  publicID: String,
};

const authorType = {
  userId: String,
  email: String,
  avatar: imgType,
  userName: String,
  role: String,
};

module.exports = { authorType, imgType };
