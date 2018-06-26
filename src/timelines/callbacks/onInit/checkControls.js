import checkOtherControls from './checkControls/checkOtherControls';
import checkFilters from './checkControls/checkFilters';

//Check control inputs for invalid settings.
export default function checkControls() {
    checkOtherControls.call(this);
    checkFilters.call(this);
}
