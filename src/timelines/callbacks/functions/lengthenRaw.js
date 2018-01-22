/*------------------------------------------------------------------------------------------------\
  Expand a data array to one item per original item per specified column.
\------------------------------------------------------------------------------------------------*/

export default function lengthenRaw(data, columns) {
    let my_data = [];

    data.forEach(d => {
        columns.forEach(column => {
            let obj = Object.assign({}, d);
            obj.wc_category = column;
            obj.wc_value = d[column];
            my_data.push(obj);
        });
    });

    return my_data;
}
