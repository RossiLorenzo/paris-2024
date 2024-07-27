export default function filter_schedules(s, f){
  // Set all elements to white
  var labels = document.getElementsByTagName("label");
  // Loop through each label element and set its background color to white
  for (var i = 0; i < labels.length; i++) {
    labels[i].style.backgroundColor = "white";
    labels[i].style.color = "#344767";
  }
  // Set the selected one to a nice color
  document.querySelector('label[for="' + f +'"]').style.backgroundColor = "#344767";
  document.querySelector('label[for="' + f +'"]').style.color = "white";
  document.querySelector('label[for="' + f +'"]').style.opacity = "1";
  // Do the actual filtering
  if (f == 'all') {
    return(s)
  }
  return(s.filter(x => x.status === f));
}