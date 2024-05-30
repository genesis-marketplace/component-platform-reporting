interface ArrayItem {
  [key: string]: string | number | boolean | object | Array<any>;
}

/**
 * @param baseArray - array of objects to filter
 * @param removalArray - array of objects to be removed
 * @param accessor - the accessor to use for identifying objects
 * @returns - a new fitered array
 */
export function filterObjectArray(
  accessor: string,
  baseArray: ArrayItem[],
  removalArray: ArrayItem[],
): ArrayItem[] {
  if (!accessor) {
    return baseArray;
  }

  const removalKeys = new Set(removalArray.map((object) => object[accessor]));

  return [...baseArray.filter((object) => !removalKeys.has(object[accessor]))];
}
