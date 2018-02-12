export default function init(data) {
    this.data = {
        raw: data
    };
    this.timelines.init(data, this.test);
}
