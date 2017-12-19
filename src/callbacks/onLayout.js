import detailsLayout from './onLayout/detailsLayout';
import controlGroupLayout from './onLayout/controlGroupLayout';
import augmentFilters from './onLayout/augmentFilters';
import augmentOtherControls from './onLayout/augmentOtherControls';
import topXaxis from './onLayout/topXaxis';

export default function onLayout() {
    const context = this;

    //Lay out details container.
    detailsLayout.call(this);

    //Move control labels and descriptions inside a div to display them vertically, label on top of description.
    controlGroupLayout.call(this);

    //Add additional functionality to filter event listeners.
    augmentFilters.call(this);

    //Add additional functionality to other control event listeners.
    augmentOtherControls.call(this);

    //Add top x-axis.
    topXaxis.call(this);
}
