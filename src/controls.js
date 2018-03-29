import { createControls } from 'webcharts';

export default function controls() {
    this.controls = createControls(this.containers.controls.node(), {
        location: 'top',
        inputs: this.settings.controls
    });
}
