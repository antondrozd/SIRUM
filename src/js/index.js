import './import-jquery'
import 'jquery-custom-select'
import 'swipeshow'

import USAMap from './usa-map'
import vectorMap from 'jvectormap-next'
import states from './states'

$(document).ready(function() {
  const $statesSelect = $('.check-donation__select-state')

  if ($statesSelect.length) {
    let html = ''
    states.forEach(({ code, name }) => {
      html += `<option value=${code}>${name}</option>`
    })
    $statesSelect.append(html)
    $statesSelect.customSelect({ search: true })

    $('.swipeshow').swipeshow({
      autostart: false,
      $dots: $('div.dots')
    })
  } else {
    $('select').customSelect()
  }

  if ($('.how-to-donate__map').length) {
    vectorMap($)
    jQuery.fn.vectorMap('addMap', 'us_aea', USAMap)

    $('.how-to-donate__map').vectorMap({
      map: 'us_aea',
      backgroundColor: 'transparent',
      regionsSelectable: true,
      regionsSelectableOne: true,
      selectedRegions: $('select.check-donation__select-state').val(),
      regionStyle: {
        initial: { fill: '#EEF8FF', stroke: 'white', 'stroke-width': 2.5 },
        hover: {
          fill: '#2191F7',
          opacity: 0.7,
          cursor: 'pointer'
        },
        selected: {
          fill: '#2191F7'
        },
        selectedHover: {
          fill: '#2191F7'
        }
      },
      zoomOnScroll: false,
      onRegionSelected: (e, stringCode, isSelected, selectedRegions) => {
        const $select = $('select.check-donation__select-state')

        $select.val(...selectedRegions)
        $select.customSelect('reset')
      }
    })

    const mapObject = $('.how-to-donate__map').vectorMap('get', 'mapObject')

    $('select.check-donation__select-state').change(function() {
      const value = $(this).val()

      mapObject.clearSelectedRegions()
      mapObject.setSelectedRegions(value)
    })

    $(window).on('resize', () => mapObject.updateSize())
  }
  
  const accordions = Array.prototype.slice.call(
    document.querySelectorAll('.accordion')
  )

  accordions.forEach(acc => {
    acc.addEventListener('click', event => {
      const panel = acc.querySelector('.accordion__panel')
      if (panel.contains(event.target)) return
      acc.classList.toggle('accordion--active')
    })
  })
})
