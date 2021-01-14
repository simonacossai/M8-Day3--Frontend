import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./index.scss";
//import article from "./data.json";
import { IoLogoTwitter, IoLogoLinkedin, IoLogoFacebook } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import Reactions from "../../components/Reactions/Reactions"

class Read extends Component {
  state={
    article:""
  }
  fetchArticle =async()=>{
    try {
      let response = await fetch(`http://localhost:3001/articles/${this.props.match.params.slug}`,
      {
          method: 'GET',
      })
      if (response.ok) {
          let article = await response.json()
          this.setState({article})
          console.log(article)
      } else {
          alert("an error accourred")
      }
  } catch (err) {
      console.log(err);
  }
  }
  componentDidMount(){
    this.fetchArticle()
  }
  render() {
    return (
<>
      <Container className="article-container">
        {this.state.article &&
          <>
          <h1>{this.state.article.headLine}</h1>
          <Row style={{ marginTop: 20, marginBottom: 20 }}>
            <Col xs={1}>
       <Image
                style={{ width: 50, height: 50 }}
                src={this.state.article.author.img ?? "https://miro.medium.com/fit/c/96/96/1*xVwJ4C9D1sjrRc-sR_jO0w.jpeg"}
                roundedCircle
              />
            </Col>
            <Col>
              {this.state.article.author.name}
              <p>Sep 23, 2018 · 3 min read</p>
            </Col>
    
            <Col>
              <div
                style={{
                  fontSize: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <IoLogoTwitter />
                <IoLogoLinkedin />
                <IoLogoFacebook />
                <IoBookmarkOutline />
              </div>
            </Col>
          </Row>
       <p>{this.state.article.content}</p>
          <Reactions id={this.props.match.params.slug}/>
</>
        }

      </Container>
         </>
    );
  }
}

export default withRouter(Read);
