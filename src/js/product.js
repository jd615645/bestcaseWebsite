$(document).ready(function () {
  $('.list-inline.product-color li').click(function () {
    let space = $(this).find('input').attr('value')
    let colorName = $(this).attr('title')
    $('.image').attr('value', space)
    $('#productColor').html(colorName)
  })
})
