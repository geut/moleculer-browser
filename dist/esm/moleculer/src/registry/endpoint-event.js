import endpoint from './endpoint.js';

/**
 * Endpoint class for events
 *
 * @class EventEndpoint
 * @extends {Endpoint}
 */
class EventEndpoint extends endpoint {

	/**
	 * Creates an instance of EventEndpoint.
	 * @param {Registry} registry
	 * @param {ServiceBroker} broker
	 * @param {Node} node
	 * @param {Service} service
	 * @param {any} event
	 * @memberof EventEndpoint
	 */
	constructor(registry, broker, node, service, event) {
		super(registry, broker, node);

		this.service = service;
		this.event = event;
	}

	/**
	 * Update properties
	 *
	 * @param {any} event
	 * @memberof EventEndpoint
	 */
	update(event) {
		this.event = event;
	}
}

var endpointEvent = EventEndpoint;

export default endpointEvent;
//# sourceMappingURL=endpoint-event.js.map
