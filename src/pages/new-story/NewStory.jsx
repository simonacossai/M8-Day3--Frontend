import React, { Component } from "react";
import ReactQuill from "react-quill";
import { Container } from "react-bootstrap";
import "react-quill/dist/quill.bubble.css";
import { Button } from "react-bootstrap";
import "./styles.scss";
import CategoryPicker from "../../components/CategoryPicker";

export default class NewStory extends Component {
  state = {
      author: "Simona",
      headLine: "",
      subHead: "aaaaaaaa",
      content: "",
      category: {
      name: "",
      img: ""
      },
      author: {
      name: "Simona Cossai",
      img: "string"
      },
      cover: ""
  };
  editor = React.createRef();
  
  onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.editor && this.editor.current.focus();
      console.log(this.editor)
      console.log(this.editor.current.focus())
    }
  };

  handleTopic(topic){
    this.setState({
      category: {
        name: topic.name,
        img: topic.img
      }})

    console.log(this.state.category.name)
    console.log(this.state.category.img)
  }
  handleTitle=(e)=>{
   this.setState({headLine: e.target.value})
  }
  handleContent=(e)=>{
    this.setState({content: this.editor.current.editingArea.innerText})
  }
  handleCover=(e)=>{
    this.setState({cover: e.target.value})
  }
  postArticles =async()=>{
    let post={
      category: this.state.category,
      headLine: this.state.headLine,
      subHead: this.state.subHead,
      content: this.state.content,
      cover: this.state.cover,
      author: {
        name: "Simona Cossai",
        img:
          "https://wips.plug.it/cips/tecnologia/cms/2017/06/meme.jpg?w=738&a=c&h=415",
      },
    }
    console.log(post)
    try {
      let response = await fetch(`http://localhost:3001/articles`,
      {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            "Content-Type": "application/json",
          },
        })
      if (response.ok) {
         alert("PUBLISHED")
      } else {
          alert("an error accourred")
      }
  } catch (err) {
      console.log(err);
  }
     }
  
  render() {
    return (
      <Container className="new-story-container" expand="md">
        <div className="category-container">
        <CategoryPicker onChange={(topic)=> this.handleTopic(topic)} />
        </div>
        <input
          onKeyDown={this.onKeyDown}
          placeholder="Title"
          onChange={(e)=> this.handleTitle(e)}
          className="article-title-input"
        />

        <ReactQuill
          modules={NewStory.modules}
          formats={NewStory.formats}
          ref={this.editor}
          onChange={(e)=> this.handleContent(e)}
          theme="bubble"
          placeholder="Tell your story..."
        />
        <input
          onChange={(e)=> this.handleCover(e)}
          placeholder="Cover link e.g : https://picsum.photos/800"
          className="article-cover-input"
        />
       
        <Button variant="success" className="post-btn" onClick={()=>this.postArticles()}>
          Post
        </Button>
      </Container>
    );
  }
}

NewStory.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],

    ["bold", "italic", "blockquote"],
    [
      { align: "" },
      { align: "center" },
      { align: "right" },
      { align: "justify" },
    ],

    ["link", "image"],

    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
NewStory.formats = [
  "header",
  "bold",
  "italic",
  "blockquote",
  "align",

  "link",
  "image",
];
