function Location(){this.items=(regionJsonData!=undefined)?regionJsonData:{};}
Location.prototype.find=function(id){if(typeof(this.items[id])=="undefined")
return false;return this.items[id];};Location.prototype.fillOption=function(el_id,loc_id,selected_id){var el=$(el_id);var json=this.find(loc_id);if(json){var index=1;var selected_index=0;$.each(json,function(key,value){var option='<option data-key="'+key+'" value="'+value+'">'+value+'</option>';el.append(option);if(key==selected_id){selected_index=index;}
index++;});el.attr('selectedIndex',selected_index);}};