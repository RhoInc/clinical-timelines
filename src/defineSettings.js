import './util/object-assign';
import configuration from './configuration/index';
import clone from './util/clone';

export default function defineSettings() {
    this.settings.merged = Object.assign(
        {},
        clone(configuration.settings),
        clone(this.settings.user)
    );
    this.settings.synced = configuration.syncSettings(clone(this.settings.merged));
    Object.assign(this.settings, clone(this.settings.synced));
    this.settings.IDtimeline = clone(this.settings.IDtimelineSettings);
    this.settings.listing = clone(this.settings.details_config);
    this.settings.controls = configuration.syncControls(
        configuration.controls(),
        clone(this.settings)
    );
}
