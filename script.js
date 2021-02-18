const slider = document.querySelector(".slider-container")
slides = Array.from(document.querySelectorAll(".slide"))

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector("img")
  slideImage.addEventListener("dragstart", (e) => e.preventDefault())

  // Touch Events
  slide.addEventListener("touchstart", touchStart(index))
  slide.addEventListener("touchend", touchEnd)
  slide.addEventListener("touchmove", touchMove)

  // Month Events
  slide.addEventListener("mousedown", touchStart(index))
  slide.addEventListener("mouseup", touchEnd)
  slide.addEventListener("mouseleave", touchEnd)
  slide.addEventListener("mousemove", touchMove)
})

window.oncontextmenu = (e) => {
  e.preventDefault()
  e.stopPropagation()
  // return false
}

function touchStart(index) {
  return (e) => {
    isDragging = true
    currentIndex = index
    startPos = getPositionX(e)
    animationID = requestAnimationFrame(animation)
    slider.classList.add("grabbing")
  }
}

function touchEnd() {
  isDragging = false
  cancelAnimationFrame(animationID)
  slider.classList.remove("grabbing")
  const moveBy = currentTranslate - prevTranslate
  if (moveBy < -100 && currentIndex < slides.length - 1) currentIndex += 1
  if (moveBy > 100 && currentIndex > 0) currentIndex -= 1
  setPositionByIndex()
}

function touchMove(e) {
  if (isDragging) {
    const currentPosition = getPositionX(e)
    currentTranslate = prevTranslate + currentPosition - startPos
  }
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX
}

function animation() {
  setSliderPosition()
  if (isDragging) requestAnimationFrame(animation)
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth
  prevTranslate = currentTranslate
  setSliderPosition()
}
