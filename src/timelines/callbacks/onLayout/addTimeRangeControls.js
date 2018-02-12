import timeRangeControl from './addTimeRangeControls/timeRangeControl';

export default function addTimeRangeControls() {
    timeRangeControl.call(this, {
        index: 0,
        option: 'x.domain.0',
        label: '',
        description: 'Start'
    });
    timeRangeControl.call(this, {
        index: 1,
        option: 'x.domain.1',
        label: '',
        description: 'End'
    });
}
