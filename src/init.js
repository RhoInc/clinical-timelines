export default function init(data) {
    this.data = {
        raw: data,
        variables: Object.keys(data[0])
    };
    this.timelines.init(data, this.test);
}
