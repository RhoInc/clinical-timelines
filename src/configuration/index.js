import rendererSettings from './rendererSettings';
import webchartsSettings from './webchartsSettings';
import syncSettings from './syncSettings';
import controls from './controls';
import syncControls from './syncControls';

export default {
    rendererSettings,
    webchartsSettings,
    settings: Object.assign({}, rendererSettings(), webchartsSettings()),
    syncSettings,
    controls,
    syncControls
};
