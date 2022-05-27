<template>
  <div
    class="transition-all duration-1000 ml-0 gap-12 flex flex-nowrap overflow-y-scroll scroll"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isFeatured: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  mounted() {
    const slider = document.querySelector('.scroll')
    if (slider) {
      let isDown = false
      let startX
      let scrollLeft
      slider.addEventListener('mousedown', (e) => {
        isDown = true
        console.log('isdown: true')
        slider.classList.add('active')
        startX = e.pageX - slider.offsetLeft
        scrollLeft = slider.scrollLeft
      })
      slider.addEventListener('mouseleave', () => {
        isDown = false
        slider.classList.remove('active')
      })
      slider.addEventListener('mouseup', (e) => {
        isDown = false
        console.log('event: mouseup')
        slider.classList.remove('active')
      })
      slider.addEventListener('mousemove', (e) => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - slider.offsetLeft
        const walk = x - startX
        slider.scrollLeft = scrollLeft - walk
      })
    }
    console.log('slider in ', slider)
  },
}
</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}
.active {
  cursor: grabbing !important;
}
.scroll {
  cursor: grab;
}
</style>
