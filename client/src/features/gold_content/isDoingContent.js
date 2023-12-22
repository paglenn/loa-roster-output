const isDoingContent = (content, goldContent) => {
  return goldContent.reduce(
    (match, c) => match || c._id === content._id,
    false
  );
};

export default isDoingContent;
