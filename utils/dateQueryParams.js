const dateQueryParams = (queryObj) => {
  let dateObj = {};

  if (queryObj.from) dateObj = { ...dateObj, $gte: queryObj.from };
  if (queryObj.to) dateObj = { ...dateObj, $lte: queryObj.to };

  return dateObj;
};

exports.dateQueryParams = dateQueryParams;