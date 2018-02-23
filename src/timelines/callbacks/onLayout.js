import IDdetails from './onLayout/IDdetails';
import controlGroupLayout from './onLayout/controlGroupLayout';
import augmentOtherControls from './onLayout/augmentOtherControls';
import hideTimeRangeControl from './onLayout/hideTimeRangeControl';
import addTimeRangeControls from './onlayout/addTimeRangeControls';
import augmentFilters from './onLayout/augmentFilters';
import topXaxis from './onLayout/topXaxis';

export default function onLayout() {
    //Lay out details container.
    IDdetails.call(this);

    //Move control labels and descriptions inside a div to display them vertically, label on top of description.
    controlGroupLayout.call(this);

    //Add additional functionality to other control event listeners.
    augmentOtherControls.call(this);

    //Hide other time range dropdown.
    hideTimeRangeControl.call(this);

    //Add time range functionality.
    addTimeRangeControls.call(this);

    //Add additional functionality to filter event listeners.
    augmentFilters.call(this);

    //Add top x-axis.
    topXaxis.call(this);
}
