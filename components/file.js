import { Component } from "react"

class File extends Component {
  render() {
    <form action="/uploadfile" enctype="multipart/form-data" method="POST"> 
      <input type="file" name="myFile" />
      <input type="submit" value="Upload a file"/>
    </form>
  }
}

export default File