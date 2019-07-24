import './import-jquery'
import 'jquery-custom-select'
import 'swipeshow'

import USAMap from './usa-map'
import vectorMap from 'jvectormap-next'
import states from './states'

vectorMap($)
jQuery.fn.vectorMap('addMap', 'us_aea', USAMap)

$(document).ready(function() {
  const $statesSelect = $('.check-donation__select-state')

  let html = ''
  states.forEach(({ code, name }) => {
    html += `<option value=${code}>${name}</option>`
  })
  $statesSelect.append(html)
  $('select').customSelect({ search: true })

  $('.swipeshow').swipeshow({
    autostart: false,
    $dots: $('div.dots')
  })

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
    },
    onViewportChange: function() {
      
    }
  })

  const mapObject = $('.how-to-donate__map').vectorMap('get', 'mapObject')

  $('select.check-donation__select-state').change(function() {
    const value = $(this).val()

    mapObject.clearSelectedRegions()
    mapObject.setSelectedRegions(value)
  })
})
