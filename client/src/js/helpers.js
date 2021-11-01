exports.getDate = () => {
  let d = new Date();
  let yyyy = d.getFullYear();
  let mm = d.getMonth() + 1;
  let dd = d.getDate();

  let createdAt = `${dd}-${mm}-${yyyy}`;
  return createdAt;
};
