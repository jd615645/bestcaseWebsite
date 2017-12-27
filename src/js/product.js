$(document).ready(function () {
  $('.list-inline.product-color li').click(function () {
    let space = $(this).find('input').attr('value')
    $('.image').attr('value', space);
  })
})
