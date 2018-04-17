export default function setClipPath() {
    this.marks.forEach(mark => {
        mark.groups
            .selectAll('circle,line,path,polygon,rect,text')
            .attr('clip-path', `url(#${this.id})`);
    });
}
