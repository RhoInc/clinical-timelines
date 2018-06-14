import getPopulationDetails from './onInit/getPopulationDetails';
import removeInvalidData from './onInit/removeInvalidData';
import attachDataToControls from './onInit/attachDataToControls';
import standardizeTimeVariables from './onInit/standardizeTimeVariables';
import handleEventTypes from './onInit/handleEventTypes';
import handleTimeRanges from './onInit/handleTimeRanges';
import checkControls from './onInit/checkControls';

import cleanData from './functions/cleanData';
import defineData from './functions/defineData';

export default function onInit() {
    getPopulationDetails.call(this);
    removeInvalidData.call(this);
    attachDataToControls.call(this);
    standardizeTimeVariables.call(this);
    handleEventTypes.call(this);
    handleTimeRanges.call(this);
    checkControls.call(this);

    cleanData.call(this);
    defineData.call(this);
}
