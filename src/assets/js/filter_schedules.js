export default function filter_schedules(s, f){
  // Set all elements to white
  var available_filters = ['FINISHED', 'RUNNING', 'ALL', 'SCHEDULED'];
  // Loop through each label element and set its background color to white
  for (var i = 0; i < available_filters.length; i++) {
    document.querySelector('label[for="' + available_filters[i] +'"]').style.backgroundColor = "white";
    document.querySelector('label[for="' + available_filters[i] +'"]').style.color = "#344767";
    document.querySelector('label[for="' + available_filters[i] +'"]').style.opacity = "1";
  }
  // Set the selected one to a nice color
  document.querySelector('label[for="' + f +'"]').style.backgroundColor = "#344767";
  document.querySelector('label[for="' + f +'"]').style.color = "white";
  document.querySelector('label[for="' + f +'"]').style.opacity = "1";
  // Do the actual filtering - ALL
  s = s.filter(x => x.status != "POSTPONED")
  if (f == 'ALL') {
    return(s)
  }
  // Completed
  if (f === "FINISHED") {
    return(s.filter(x => x.status === f));
  }
  // Running
  if (f === "RUNNING") {
    return(s.filter(x => ["GETTING_READY", "RUNNING"].includes(x.status)));
  }
  // All other ones
  return(s.filter(x => !["GETTING_READY", "FINISHED", "RUNNING"].includes(x.status)))
}