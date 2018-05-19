let classname = document.getElementsByClassName("fa-trash-alt");

let deleteItem = function() {
   let id = this.getAttribute("data-id");

   let xhr = new XMLHttpRequest();
   let url = "/delete";
   xhr.open("POST", url, true);
   xhr.setRequestHeader("Content-Type", "application/json");

   xhr.onreadystatechange = function () {
       if (xhr.readyState === 4 && xhr.status === 200) {
           let json = JSON.parse(xhr.responseText);
           console.log(json);
       }
   };

   let data = JSON.stringify({'story_id': id});
   xhr.send(data);

   this.parentNode.parentNode.remove();
};

for (let i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', deleteItem, false); 
}