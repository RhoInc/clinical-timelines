import './util/object-assign';
import defaults from './defaults/index';
import clone from './util/clone';

export default function defineSettings() {
    this.settings.merged = Object.assign({}, defaults.settings, clone(this.settings.user));
    this.settings.synced = defaults.syncSettings(clone(this.settings.merged));
    this.settings.IDtimeline = this.settings.synced.IDtimelineSettings;
    this.settings.listing = this.settings.synced.details_config;
    this.settings.controls = defaults.syncControls(defaults.controls, clone(this.settings.synced));
}
