const getDateRange = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (date) => date.toISOString().split('T')[0];

  return {
    today: {
      since: formatDate(today),
      until: formatDate(today),
    },
    yesterday: {
      since: formatDate(yesterday),
      until: formatDate(yesterday),
    }
  };
};
