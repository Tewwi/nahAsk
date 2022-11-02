async function pagination(req, res, models, option = {}, populate = "") {
  let p = 1;
  let n = 10;
  let sortOrder = { createAt: "descending" };
  let optionQuery = option;

  if (req.query && req.query.p) {
    p = Number(req.query.p);
  }

  if (req.query && req.query.sortBy && req.query.sort) {
    sortOrder = { [req.query.sortBy]: req.query.sort.toString() };
  }

  const total = await models.find(option).count().exec();

  if ((p - 1) * n < total) {
    let data = await models
      .find(optionQuery)
      .populate(populate)
      .sort(sortOrder)
      .skip((p - 1) * n)
      .limit(n)
      .exec();

    res.status(200).json({
      data: data,
      message: "get data success",
      length: data.length,
      total: total,
    });
  } else {
    res.status(400).json({ message: "cant find" });
  }
}
module.exports = pagination;
