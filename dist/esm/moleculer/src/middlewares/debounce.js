import { setTimeout } from 'timers-browserify';

var debounce = function debounceMiddleware(broker) {

	function wrapEventDebounceMiddleware(handler, event) {
		if (event.debounce > 0) {
			let timer;

			return function debounceMiddleware(ctx) {
				if (timer)
					clearTimeout(timer);

				timer = setTimeout(() => {
					timer = null;
					return handler(ctx);
				}, event.debounce);

				return broker.Promise.resolve();
			}.bind(this);
		}
		return handler;
	}

	return {
		name: "Debounce",

		localEvent: wrapEventDebounceMiddleware
	};
};

export default debounce;
//# sourceMappingURL=debounce.js.map
