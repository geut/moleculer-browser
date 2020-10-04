import kleur from 'kleur'
import moleculer from './moleculer/index.js'

// We disabled kleur since colors are only works in chrome and not so good.
kleur.enabled = false

export const ServiceBroker = moleculer.ServiceBroker
export const Loggers = moleculer.Loggers
export const Service = moleculer.Service
export const Context = moleculer.Context
export const Cachers = moleculer.Cachers
export const Transporters = moleculer.Transporters
export const Serializers = moleculer.Serializers
export const Strategies = moleculer.Strategies
export const Validators = moleculer.Validators
export const TracerExporters = moleculer.TracerExporters
export const MetricTypes = moleculer.MetricTypes
export const MetricReporters = moleculer.MetricReporters
export const METRIC = moleculer.METRIC
export const Registry = moleculer.Registry
export const Discoverers = moleculer.Discoverers
export const Middlewares = moleculer.Middlewares
export const Errors = moleculer.Errors
export const Runner = false
export const Utils = moleculer.Utils
export const CIRCUIT_CLOSE = moleculer.CIRCUIT_CLOSE
export const CIRCUIT_HALF_OPEN = moleculer.CIRCUIT_HALF_OPEN
export const CIRCUIT_HALF_OPEN_WAIT = moleculer.CIRCUIT_HALF_OPEN_WAIT
export const CIRCUIT_OPEN = moleculer.CIRCUIT_OPEN
export const MOLECULER_VERSION = moleculer.MOLECULER_VERSION
export const PROTOCOL_VERSION = moleculer.PROTOCOL_VERSION
