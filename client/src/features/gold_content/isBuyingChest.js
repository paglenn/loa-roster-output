const isBuyingChest = (content, goldContent) => {
  return goldContent.reduce(
    (match, c) => match || (c._id === content._id && c.chest.buy),
    false
  );
};

export default isBuyingChest;
