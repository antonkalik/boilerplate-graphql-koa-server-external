const fakeData = {
  id: 23124523423,
  label: 'Some Label From External Server',
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
