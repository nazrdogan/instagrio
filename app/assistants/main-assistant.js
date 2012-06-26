var MainAssistant = Class.create(BaseAssistant, (function() {
	var private_fn = {};

	return {
		initialize: function(params) {
			this.TAG = 'MainAssistant';

			if (params != null) {
				if (params.source == 'oauth') {
					var response = params.response.responseJSON;
					if (params.response.status == 200) {
						AppHandler.access_token = response.access_token;
						AppHandler.user = response.user;
						Mojo.Log.info(this.TAG, this.access_token);
						AppDB.saveOAuth(response);
					}
				}
			}
			//$('float_all').hide();
		},
		setup: function($super) {
			Mojo.Log.info(this.TAG, 'setup');
			$super();
			this.floatAll = this.controller.get('float_all');
			this.floatAll.hide();

			var photoListHelper = new PhotoListHelper({
				idList: 'feed-list',
				controller: this.controller,
				linkable: true,
				assistant: this
			});
			this.photoListHelper = photoListHelper;

			this.callback = photoListHelper.callback();
			this.refresh({
				source: 'menu',
				which: 'home'
			});
		},
		refresh: function(opts) {
			if (opts != null) {
				if (opts.source == 'menu') {
					switch (opts.which) {
					case 'home':
						AppSDK.getFeed(this.callback);
						break;
					case 'hot':
						AppSDK.getPopular(this.callback);
						break;
					case 'mine':
						AppSDK.getMine(this.callback);
						break;
					case 'liked':
						AppSDK.getUsersSelfMediaLiked(this.callback);
						break;
					default:
						break;
					}
				}
			}
		},
		activate: function($super, event) {
			Mojo.Log.info(this.TAG, 'on activate ' + Mojo.Log.propertiesAsString(event, true));
			this.refresh(event);
			$super(event);
		},
		deactivate: function($super, event) {
			$super(event);
		},
		cleanup: function($super, event) {
			$super(event);
			Mojo.Log.info(this.TAG, 'cleanup');
		}
	};
})());

