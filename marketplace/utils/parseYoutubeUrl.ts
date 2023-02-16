export default function parseYoutubeUrl(Url:string) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = Url.match(regExp);

  if (match && match[7].length == 11) {
    return "https://www.youtube.com/embed/" + match[7];
  } else if (Url === "") {
    console.log("Leere Url");
  } else {
    return false;
  }
}
