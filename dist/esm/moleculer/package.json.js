var name = "moleculer";
var version = "0.14.11";
var description = "Fast & powerful microservices framework for Node.JS";
var main = "index.js";
var scripts = {
	bench: "node benchmark/index.js",
	ci: "jest --watch",
	coverall: "cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
	demo: "node examples/index.js",
	deps: "npm-check -u",
	postdeps: "npm run lint:lock && npm test",
	dev: "nodemon dev/index.js",
	lint: "eslint --ext=.js src test/unit test/integration",
	"lint:lock": "lockfile-lint --path package-lock.json --type npm --validate-https --allowed-hosts npm",
	"lint:fix": "eslint --fix --ext=.js src test/unit test/integration",
	perf: "nodemon --allow-natives-syntax benchmark/perf-runner.js",
	pperf: "node --inspect --expose-gc benchmark/perf-runner.js",
	memleak: "node benchmark/memleak-test.js",
	proto: "pbjs -t static-module -w commonjs -o src/serializers/proto/packets.proto.js src/serializers/proto/packets.proto",
	thrift: "thrift -gen js:node -o src\\serializers\\thrift src\\serializers\\thrift\\packets.thrift",
	test: "node --max-old-space-size=4096 ./node_modules/jest-cli/bin/jest.js --coverage --all --forceExit --logHeapUsage",
	"test:travis": "npm test && npm run test:trans && npm run test:amqp && npm run test:nats && npm run test:ts",
	"test:unit": "jest --testMatch \"**/unit/**/*.spec.js\" --coverage",
	"test:int": "jest --testMatch \"**/integration/**/*.spec.js\" --coverage",
	"test:amqp": "jest --testMatch \"**/transporters/amqp/**spc.js\" --runInBand",
	"test:amqp10": "jest --testMatch \"**/transporters/amqp10/**spc.js\" --runInBand",
	"test:nats": "jest --testMatch \"**/transporters/nats/**spc.js\" --runInBand",
	"test:trans": "jest --testMatch \"**/transporters/index.spc.js\"",
	"test:project": "jest --testMatch \"**/project/**/*.spec.js\"",
	"test:ts": "tsd && tsc -p test/typescript/hello-world && ts-node -P test/typescript/hello-world/tsconfig.json test/typescript/hello-world/index.ts",
	release: "npm publish --access public && git push --tags",
	"release:beta": "npm publish --tag next --access public && git push --tags"
};
var keywords = [
	"microservice",
	"microservices",
	"framework",
	"backend",
	"messagebus",
	"rpc",
	"services",
	"micro",
	"pubsub",
	"scalable",
	"distributed"
];
var repository = {
	type: "git",
	url: "https://github.com/moleculerjs/moleculer.git"
};
var funding = "https://github.com/moleculerjs/moleculer?sponsor=1";
var bin = {
	"moleculer-runner": "./bin/moleculer-runner.js"
};
var author = "Icebob";
var license = "MIT";
var devDependencies = {
	"@sinonjs/fake-timers": "^6.0.1",
	"@types/bunyan": "^1.8.6",
	"@types/ioredis": "^4.17.4",
	"@types/node": "^14.11.2",
	"@types/pino": "^6.3.1",
	amqplib: "^0.6.0",
	avsc: "^5.4.22",
	benchmarkify: "^2.1.2",
	bunyan: "^1.8.14",
	coveralls: "^3.1.0",
	"dd-trace": "^0.26.1",
	debug: "^4.2.0",
	dotenv: "^8.2.0",
	eslint: "^7.10.0",
	"eslint-plugin-node": "^11.1.0",
	"eslint-plugin-promise": "^4.2.1",
	"eslint-plugin-security": "^1.4.0",
	etcd3: "^1.0.2",
	"event-loop-stats": "^1.3.0",
	fakerator: "^0.3.1",
	"gc-stats": "^1.4.0",
	ioredis: "^4.17.3",
	"jaeger-client": "^3.18.1",
	jest: "^26.4.2",
	"jest-cli": "^26.4.2",
	joi: "^17.2.1",
	"kafka-node": "^5.0.0",
	"lockfile-lint": "^4.3.7",
	log4js: "^6.3.0",
	"moleculer-repl": "^0.6.4",
	mqtt: "^4.2.1",
	msgpack5: "^4.2.1",
	nats: "^1.4.12",
	"node-nats-streaming": "^0.0.51",
	nodemon: "^2.0.4",
	"notepack.io": "^2.3.0",
	"npm-check": "^5.9.2",
	pino: "^6.6.1",
	protobufjs: "^6.10.1",
	redlock: "^4.1.0",
	"rhea-promise": "^1.0.0",
	supertest: "^5.0.0",
	thrift: "^0.12.0",
	"ts-node": "^9.0.0",
	tsd: "^0.13.1",
	typescript: "^4.0.3",
	"v8-natives": "^1.2.0",
	winston: "^3.3.3",
	"winston-context": "^0.0.7"
};
var dependencies = {
	args: "^5.0.1",
	"es6-error": "^4.1.1",
	eventemitter2: "^6.4.3",
	"fastest-validator": "^1.7.0",
	"fn-args": "^5.0.0",
	glob: "^7.1.6",
	"ipaddr.js": "^2.0.0",
	kleur: "^4.1.2",
	lodash: "^4.17.20",
	"lru-cache": "^6.0.0",
	"node-fetch": "^2.6.1"
};
var engines = {
	node: ">= 10.x.x"
};
var types = "./index.d.ts";
var tsd = {
	directory: "test/typescript/tsd"
};
var jest = {
	coverageDirectory: "../coverage",
	coveragePathIgnorePatterns: [
		"/node_modules/",
		"/test/services/",
		"/test/typescript/",
		"/test/unit/utils.js",
		"/src/serializers/proto/",
		"/src/serializers/thrift/"
	],
	transform: {
	},
	testEnvironment: "node",
	rootDir: "./src",
	roots: [
		"../test"
	]
};
var require$$7 = {
	name: name,
	version: version,
	description: description,
	main: main,
	scripts: scripts,
	keywords: keywords,
	repository: repository,
	funding: funding,
	bin: bin,
	author: author,
	license: license,
	devDependencies: devDependencies,
	dependencies: dependencies,
	engines: engines,
	types: types,
	tsd: tsd,
	jest: jest
};

export default require$$7;
export { author, bin, dependencies, description, devDependencies, engines, funding, jest, keywords, license, main, name, repository, scripts, tsd, types, version };
//# sourceMappingURL=package.json.js.map
