module.exports.hanldeError = {
  auth: (err) => {
    let errors = { email: "", password: "" };

    if (err.message === "Incorrect email") {
      errors.email = "Email không chính xác";
    }

    if (err.message === "Incorrect password") {
      errors.password = "Mật khẩu không chính xác";
    }

    if (err.code === 11000) {
      errors.email = "Email này đã tồn tại";
      return errors;
    }

    if (err.message.includes("User validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }

    return errors;
  },
};
