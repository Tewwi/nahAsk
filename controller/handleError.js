module.exports.hanldeError = {
  auth: (err) => {
    let errors = { email: "", password: "" };

    if (err.message === "Incorrect email") {
      errors.email = "Incorrect email";
    }

    if (err.message === "Incorrect password") {
      errors.password = "Incorrect password";
    }

    if (err.code === 11000) {
      errors.email = "That email is already registered";
      return errors;
    }

    if (err.message.includes("User validation failed")) {
      Object.values(err.errors).forEach(({ properties }) => {
        //console.log(properties);
        errors[properties.path] = properties.message;
      });
    }

    return errors;
  },
};
