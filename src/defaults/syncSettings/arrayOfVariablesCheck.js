import { merge } from 'd3';

export default function arrayOfVariablesCheck(defaultVariables, userDefinedVariables) {
    const validSetting =
        userDefinedVariables instanceof Array && userDefinedVariables.length
            ? merge([
                  defaultVariables,
                  userDefinedVariables.filter(
                      item =>
                          !(item instanceof Object && item.hasOwnProperty('value_col') === false) &&
                          defaultVariables.map(d => d.value_col).indexOf(item.value_col || item) ===
                              -1
                  )
              ]).map(item => {
                  const itemObject = item instanceof Object
                    ? Object.assign({}, item)
                    : {value_col: item};

                  itemObject.label = itemObject.label || itemObject.value_col;

                  return itemObject;
              })
            : defaultVariables;

    return validSetting;
}
