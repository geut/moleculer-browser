import { EventEmitter } from './events.js';
import cpus from 'cpus';

class RafPerf extends EventEmitter {
  constructor (options) {
    super();

    this.options = { ...RafPerf.defaultOptions, ...options };

    this.reset();

    this.tick = this.tick.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
  }

  reset () {
    this.isVisible = true;
    this.running = false;
    this.prevTime = null;
    this.startTime = null;

    this.frameDuration = RafPerf.fpsToMs(this.options.fps);

    this.performance = undefined;
    this.perfSamples = [];

    if (this.requestID) cancelAnimationFrame(this.requestID);
  }

  start () {
    // Check if loop is already running
    if (this.running) return

    // Set running state and initial time
    this.running = true;
    this.prevTime = RafPerf.now();
    this.startTime = this.prevTime;
    this.perfStartTime = this.prevTime;

    // Add visibility listener
    document.addEventListener(
      'visibilitychange',
      this.onVisibilityChange,
      false
    );

    // Start ticking
    this.requestID = requestAnimationFrame(this.tick);
  }

  tick () {
    // Ensure loop is running
    if (!this.running || !this.isVisible) return

    const { performances } = this.options;

    // Compute delta time since previous time
    const time = RafPerf.now();
    const deltaTime = time - this.prevTime;

    // Compute delta since previous frame
    const frameDeltaTime = time - this.startTime;

    // Check elapsed time is more than desired frame duration
    if (deltaTime > this.frameDuration) {
      if (performances.enabled) {
        // Push delta time for average computation
        this.perfSamples.push(frameDeltaTime);

        // Check if enough time has passed to sample or number of samples collected is enough
        const perfNeedsUpdates =
          (performances.sampleDuration &&
            time - this.perfStartTime > performances.sampleDuration) ||
          this.perfSamples.length > performances.samplesCount;

        if (perfNeedsUpdates) {
          // Check average and update performance ratio
          const averageDeltaTime =
            this.perfSamples.reduce((time, sum) => time + sum) /
            this.perfSamples.length;
          this.performance = this.frameDuration / averageDeltaTime;
          this.emit('perf', this.performance);

          // Reset performances variables
          this.perfSamples = [];
          this.perfStartTime = time;
        }
      }

      // Update prev and start time
      // Compensate for gap between delta time and x number of frames
      this.prevTime = time - (deltaTime % this.frameDuration);
      this.startTime = time;

      // Call user callback function with delta time
      this.emit('tick', frameDeltaTime);
    }

    this.requestID = requestAnimationFrame(this.tick);
  }

  stop () {
    document.removeEventListener(
      'visibilitychange',
      this.onVisibilityChange,
      false
    );

    this.reset();
  }

  onVisibilityChange () {
    this.isVisible = !document.hidden;

    if (this.isVisible) {
      this.reset();
      this.start();
    }
  }
}

// Static
RafPerf.defaultOptions = {
  fps: 60,
  performances: {
    enabled: true,
    samplesCount: 200,
    // If everything runs smoothtly, samplesCount will be used over sampleDuration
    // 1000 ms / 60 fps * 200 samplesCount = 3333 ms
    sampleDuration: 4000
  }
};

RafPerf.now = () => {
  return (performance || Date).now()
};

RafPerf.fpsToMs = value => {
  return (1 / value) * 1000
};

// Simulate https://nodejs.org/api/os.html#os_os_loadavg
const _osLoadAvg = [
  // 1 minute
  {
    time: Math.floor(Date.now() / 1000),
    init: false,
    avg: 0
  },

  // 5 minutes
  {
    time: Math.floor(Date.now() / 1000),
    avg: 0
  },

  // 15 minutes
  {
    time: Math.floor(Date.now() / 1000),
    avg: 0
  }
];

function updateLoadAvg (avg) {
  const currentTime = Math.floor(Date.now() / 1000);
  if (!_osLoadAvg[0].init || (currentTime - _osLoadAvg[0].time) > 60) {
    _osLoadAvg[0].init = true;
    _osLoadAvg[0].time = currentTime;
    _osLoadAvg[0].avg = avg;
  }

  if ((currentTime - _osLoadAvg[1].time) > 60 * 5) {
    _osLoadAvg[1].time = currentTime;
    _osLoadAvg[1].avg = avg;
  }

  if ((currentTime - _osLoadAvg[2].time) > 60 * 15) {
    _osLoadAvg[2].time = currentTime;
    _osLoadAvg[2].avg = avg;
  }
}

function loadavg () {
  return _osLoadAvg.map(value => value.avg)
}

/**
 * getCpuUsage
 *
 * Simulate cpuUsage of the browser based on the FPS performance.
 *
 * rate 1 (60fps) -> 0% usage
 * rate 0.5 (30fps) -> 50% usage
 * rate 0 (0fps) -> 100% usage
 *
 * @param {Boolean=100} sampleTime
 * @returns {Promise<Result>}
 */
function getCpuUsage (sampleTime = 100) {
  const engine = new RafPerf({
    performances: {
      enabled: true,
      samplesCount: 3,
      sampleDuration: sampleTime
    }
  });

  return new Promise((resolve, reject) => {
    engine.once('perf', ratio => {
      engine.stop();

      if (!ratio) {
        return reject(new Error('CpuUsage: ratio perf not found.'))
      }

      const avg = 100 - (ratio * 100);
      const avgByCpu = avg / cpus().length;

      updateLoadAvg(avg);

      resolve({
        avg,
        usages: cpus().map(cpu => avgByCpu)
      });
    });

    engine.start();
  })
}

getCpuUsage.loadavg = loadavg;

export default getCpuUsage;
//# sourceMappingURL=cpu-usage.js.map
