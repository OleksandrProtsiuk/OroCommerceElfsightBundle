define(function (require) {
    'use strict';

    const BaseComponent = require('oroui/js/app/components/base/component');
    const EntityModel = require('oroentity/js/app/models/entity-model');
    const mediator = require('oroui/js/mediator');

    const CreateElfsightWidgetComponent = BaseComponent.extend({
        /**
         * @inheritdoc
         */
        initialize: function (options) {
            ElfsightEmbedSDK.displayButton(options._sourceElement[0], this._onCreate.bind(this), options.buttonOptions);
        },

        _onCreate: function (response) {
            if (response.id && response.app) {
                const model = new EntityModel({data: {
                    type: 'orocommerceelfsightelfsightwidgets',
                    id: null,
                    attributes: {
                        identifier: response.id,
                        name: response.app + ' ' + response.id
                    }
                }});
                model.on('sync', function () {
                    mediator.trigger('datagrid:doRefresh:ystools-elfsight-widget-grid');
                });
                model.save();
            }
        }
    });

    return CreateElfsightWidgetComponent;
});