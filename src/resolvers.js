const fakeData = {
  id: 223421,
  label: 'Some Label From External',
};

module.exports = {
  Query: {
    getItemsExternal: () => [fakeData],
  },
  Mutation: {
    updateDataExternal: (_, { label }) => {
      return {
        ...fakeData,
        label,
      };
    },
  },
};
