const getUserId = (authorization) => {
  let userId = 0;

  if (authorization) {
    userId = 1;
  }

  return userId;
};

export const context = async ({ req, _res }) => {
  return {
    userId: getUserId(req.headers.authorization),
  };
};
