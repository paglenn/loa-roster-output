const calculateBusValue = (buses) => {
  return Object.keys(buses).reduce(
    (sum, name) => sum + buses[name].num * buses[name].price,
    0
  );
};

export default calculateBusValue;
