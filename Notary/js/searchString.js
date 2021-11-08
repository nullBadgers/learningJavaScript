//load a book from disk (book folder)
loadBook = (fileName, displayName) => {
  let currentBook = "";
  let url = "books/" + fileName;

  //resets the UI after earch search
  document.getElementById("fileName").innerHTML = displayName;
  document.getElementById("searchStat").innerHTML = "";
  document.getElementById("keyword").value = "";

  //create a server request to load books and then run as async request and then initiate network traffic
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();

  //this anon func will check if request is done
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      currentBook = xhr.responseText;

      //remove line breaks, carriage returns and replace with a <br>
      currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, "<br>");

      //load the book from server and streamed back into page and change the inner HTML content
      document.getElementById("fileContent").innerHTML = currentBook;

      //this will scroll the viewer to top when changing books (loading a book)
      let elmnt = document.getElementById("fileConent");
      elmnt.scrollTop = 0;
    }
  };
};
