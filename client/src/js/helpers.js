exports.getDate = () => {
  let d = new Date();
  let yyyy = d.getFullYear();
  let mm = d.getMonth() + 1;
  let dd = d.getDate();

  let createdAt = `${dd}-${mm}-${yyyy}`;
  return createdAt;
};

exports.sumFloat = (num1, num2) => {
  let float1 = Math.round(num1 * 100) / 100;
  let float2 = Math.round(num2 * 100) / 100;
  let sum = float1 + float2;
  return sum;
};

exports.floatParser = (parse) => {
  return Math.round(parse * 100) / 100;
};
