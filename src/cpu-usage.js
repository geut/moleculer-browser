import cpus from 'cpus'
import RafPerf from 'raf-perf'

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
]

function updateLoadAvg (avg) {
  const currentTime = Math.floor(Date.now() / 1000)
  if (!_osLoadAvg[0].init || (currentTime - _osLoadAvg[0].time) > 60) {
    _osLoadAvg[0].init = true
    _osLoadAvg[0].time = currentTime
    _osLoadAvg[0].avg = avg
  }

  if ((currentTime - _osLoadAvg[1].time) > 60 * 5) {
    _osLoadAvg[1].time = currentTime
    _osLoadAvg[1].avg = avg
  }

  if ((currentTime - _osLoadAvg[2].time) > 60 * 15) {
    _osLoadAvg[2].time = currentTime
    _osLoadAvg[2].avg = avg
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
  })

  return new Promise((resolve, reject) => {
    engine.once('perf', ratio => {
      engine.stop()

      if (!ratio) {
        return reject(new Error('CpuUsage: ratio perf not found.'))
      }

      const avg = 100 - (ratio * 100)
      const avgByCpu = avg / cpus().length

      updateLoadAvg(avg)

      resolve({
        avg,
        usages: cpus().map(cpu => avgByCpu)
      })
    })

    engine.start()
  })
}

getCpuUsage.loadavg = loadavg

export default getCpuUsage
