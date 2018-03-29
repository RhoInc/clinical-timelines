import './util/object-assign';
import defaults from './defaults/index';
import clone from './util/clone';

export default function defineSettings() {
    this.settings.merged = Object.assign({}, clone(defaults.settings), clone(this.settings.user));
    this.settings.synced = defaults.syncSettings(clone(this.settings.merged));
    Object.assign(this.settings, clone(this.settings.synced));
    this.settings.IDtimeline = clone(this.settings.IDtimelineSettings);
    this.settings.listing = clone(this.settings.details_config);
    this.settings.controls = defaults.syncControls(clone(defaults.controls), clone(this.settings));
}
