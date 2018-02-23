//Attach initial, valid data to controls, bypassing controls.init().
export default function attachDataToControls() {
    this.controls.data = this.initial_data;
    this.controls.ready = true;
}
