import './util/object-assign';
import defaults from './defaults/index';
import clone from './util/clone';

export default function defineSettings() {
    this.settings.merged = Object.assign({}, clone(defaults.settings), clone(this.settings.user));
    this.settings.synced = defaults.syncSettings(clone(this.settings.merged));
    Object.assign(this.settings, this.settings.synced);
    this.settings.IDtimeline = this.settings.IDtimelineSettings;
    this.settings.listing = this.settings.details_config;
    this.settings.controls = defaults.syncControls(defaults.controls, clone(this.settings));
}
