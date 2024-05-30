/**
 * Updates selectedFields based on checked and unchecked fields
 */
export const getSelectedFields = (allFields, selectedFields) => {
  const getAllSelectedFields = allFields.gridApi.getSelectedRows().filter((row) => {
    return !selectedFields.find((field) => field.name === row.name);
  });

  const selectedAndUnselectedFields = [...selectedFields, ...getAllSelectedFields];

  const removeUnselectedFields = selectedAndUnselectedFields.filter((field) => {
    return allFields.gridApi.getSelectedRows().find((row) => row.name === field.name);
  });

  return removeUnselectedFields;
};
