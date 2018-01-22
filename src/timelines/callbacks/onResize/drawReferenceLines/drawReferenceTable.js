import updateTable from './drawReferenceTable/updateTable';

export default function drawReferenceTable(reference_line, i) {
    //Add reference line table container.
    if (reference_line.tableContainer) reference_line.tableContainer.remove();
    reference_line.tableContainer = this.clinicalTimelines.containers.leftColumn
        .append('div')
        .classed('ct-reference-line-table-container', true)
        .attr('id', 'ct-reference-line-table-container-' + i);

    //Add reference line table header.
    reference_line.tableHeader = reference_line.tableContainer
        .append('h3')
        .classed('ct-reference-line-header', true);

    //Add reference line table.
    reference_line.table = reference_line.tableContainer
        .append('table')
        .classed('ct-reference-line-table', true)
        .append('tbody');

    //Add table data.
    updateTable.call(this, reference_line);
}
