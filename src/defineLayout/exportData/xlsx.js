import { time } from 'd3';

export default function xlsx(data, headers, columns) {
    const sheetName = 'Selected Data',
        options = {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary'
        },
        arrayOfArrays = data.map(d => columns.map(column => d[column])), // convert data from array of objects to array of arrays.
        workbook = {
            SheetNames: [sheetName],
            Sheets: {}
        },
        cols = [];

    //Convert headers and data from array of arrays to sheet.
    workbook.Sheets[sheetName] = XLSX.utils.aoa_to_sheet([headers].concat(arrayOfArrays));

    //Add filters to spreadsheet.
    workbook.Sheets[sheetName]['!autofilter'] = {
        ref: `A1:${String.fromCharCode(64 + columns.length)}${data.length + 1}`
    };

    //Define column widths in spreadsheet.
    workbook.Sheets[sheetName]['!cols'] = headers.map(header => {
        return {
            wpx: header.length * 7
        };
    });

    const xlsx = XLSX.write(workbook, options),
        s2ab = function(s) {
            const buffer = new ArrayBuffer(s.length),
                view = new Uint8Array(buffer);

            for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;

            return buffer;
        }; // convert spreadsheet to binary or something, i don't know

    //transform CSV array into CSV string
    const blob = new Blob([s2ab(xlsx)], { type: 'application/octet-stream;' }),
        fileName = `webchartsTableExport_${time.format('%Y-%m-%dT%H-%M-%S')(new Date())}.xlsx`,
        link = this.containers.exportButton;

    if (navigator.msSaveBlob) {
        // IE 10+
        link.style({
            cursor: 'pointer',
            'text-decoration': 'underline',
            color: 'blue'
        });
        navigator.msSaveBlob(blob, fileName);
    } else {
        // Browsers that support HTML5 download attribute
        if (link.node().download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.node().setAttribute('href', url);
            link.node().setAttribute('download', fileName);
        }
    }
}
