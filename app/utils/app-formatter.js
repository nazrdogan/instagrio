var AppFormatter = {
	time: function(time, model) {
		return AppFormatter.timeSince(parseInt(time) * 1000);
	},
	timeSince: function(time) {
		//using a modified Date function in vendors/date.js
		var d = new Date(time);
		return d.toRelativeTime(1500);
	},
	location: function(n, model) {
		if (n && n.name && n.latitude && n.longitude) {
			return "<p class='location' lat='" + n.latitude + "'" + "lng='" + n.longitude + "'>" + ioNull.emoji.parse(n.name) + "</p>";
		} else {
			return '';
		}
	},
	user: function(n, model) {
		if (n == null) return '';
		return 'userInfo photoUser';
	},
	user_nolink: function(n, model) {
		return '';
	},
	likesCount: function(n, model) {
		if (n) {
			var img = '';
			if (model.user_has_liked) {
				img = 'liked';
			} else {
				img = 'unliked';
			}
			var like = n.count + '&nbsp;';
			/*
			if(n.count > 1) {
				like = n.count + ' likes';
			} else {
				like = n.count + ' like';
			}
			*/
			like = "<div class='likeContent " + img + "' data-id='" + model.id + "'/>" + like + "</div>";
			return like;
		} else {
			return '';
		}
	},
	videos: function(n, model) {
		if (n) {
			if (n.standard_resolution || n.low_resolution) {
				var outer = '<div id="video-icon" class="video" style="position: absolute;left: 15px; top: 70px;">';
				return outer + "&nbsp;<span class='videoContent hasVideo' data-video='" 
					+ n.standard_resolution.url + "'/>&nbsp;</span>"
					+ "</div>"
					;
			}
		}
		return '';
	},
	index: function(n, model) {
		if (n) {
			if (n % 2 != 0) {
				return 'user-item-dark';
			}
		}
		return 'user-item-light';
	},
	caption: function(n, model) {
		if(n) {
			return ioNull.emoji.parse(n.text);
		}
		return '';
	},
	comments: function(n, model) {
		if (n && n.count > 0) {
			var count = '';
			if (n.count > 1) {
				count = n.count + ' comments';
			} else {
				count = n.count + ' comment';
			}
			count = ('<a href="#" class="commentsCount username" data-id="' + model.id + '">' + count + '</a>');
			var list = '';
			for (var now in n.data) {
				var curr = n.data[now];
				if (! (curr.text)) continue;
				list += ('<br/><a href="#" class="username userInfo commentUser" data-id="' + model.id + '" sub-id="' + now + '">' + curr.from.username + '</a>:&nbsp;' + ioNull.emoji.parse(curr.text) + '&nbsp;&nbsp;' + AppFormatter.timeSince(parseInt(curr.created_time) * 1000));
			}
			return count + list;
		} else {
			return '';
		}
	},
	images: function(n, model) {
		if (n) {
			var sHeight = Mojo.Environment.DeviceInfo.screenHeight;
			//Mojo.Log.error('screen height : ' + sHeight);
			if (sHeight > 500) {
				return n.standard_resolution.url;
			} else {
				return n.low_resolution.url;
			}
		}
		return '';
	},
	imageHeight: function(n, model) {
		if (n) {
			var sHeight = Mojo.Environment.DeviceInfo.screenHeight;
			var sWidth = Mojo.Environment.DeviceInfo.screenWidth;
			var minHeight = sWidth - 20;
			if (sHeight > 500) {
				minHeight = 300;
			}
			return minHeight + 'px';
		} else {
			return 300 + 'px';
		}
	},
	text: function(n, model) {
		if(n) {
			return ioNull.emoji.parse(n);
		} else {
			return '';
		}
	}
};

