export const test = (req, res) => {
  res.json({ message: `this is test api` });
};

export const updateUser = async (req, res, next) => {
  console.log("this si the user", req.user);
};
