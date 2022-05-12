const getLocalData = (key) => {
  const value = localStorage.getItem(key);
  
  try {
    const scores = JSON.parse(value).map((item) => item.score);
    console.log(scores.reduce((prev, curr) => prev + curr, 0));
  } catch (err) {
    console.log(err);
  }

  return value ? JSON.parse(value) : undefined;
};

export default getLocalData;
