import exporters from './exporters/index.js';
import span from './span.js';
import tracer from './tracer.js';

var tracing = {
	Tracer: tracer,
	Span: span,
	Exporters: exporters,
};

export default tracing;
//# sourceMappingURL=index.js.map
