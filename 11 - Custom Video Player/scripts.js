const player = document.querySelector('.player')
const vid = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipBtns = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')

function togglePlay(){
  const method = vid.paused ? 'play' : 'pause'
  vid[method]()
}

function updateBtn(){
  const icon = this.paused ? '►' : '❚ ❚'
  toggle.textContent = icon
}

function skip(){
  vid.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
  vid[this.name] = this.value
}

function handleProgress(){
  const percent = (vid.currentTime / vid.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * vid.duration
  vid.currentTime = scrubTime
}

vid.addEventListener('click', togglePlay)
vid.addEventListener('play', updateBtn)
vid.addEventListener('pause', updateBtn)
vid.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipBtns.forEach(btn => btn.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
