import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize: 8,
    category: 'general'
  }
  static defaultProps = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

  constructor(){
      super();
   
      this.state = {
        articles : [],
        loading: false,
        page:1

      }
  }

async componentDidMount(){
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=566707e6709642869e739d24148bfecc&pageSize=${this.props.pageSize}`;
  this.setState({loading: true});
  let data = await fetch(url);
  let parseData = await data.json();
  this.setState({
    articles: parseData.articles,
    
    TotalResults:parseData.TotalResults,
    loading: false

  })
  
}

handelPrevClick = async() =>{
  
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=566707e6709642869e739d24148bfecc&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
  this.setState({loading: true});
  let data = await fetch(url);
  let parseData = await data.json();
  
  this.setState({
    page:this.state.page - 1,
    articles: parseData.articles,
    loading: false
  })

}

handelNextClick = async()=>{
  console.log("next")
  if(!(this.state.page +1 > Math.ceil(this.TotalResults/this.props.pageSize))){
  this.setState({loading: true});
  
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=566707e6709642869e739d24148bfecc&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parseData = await data.json();
  
  this.setState({
    page:this.state.page + 1,
    articles: parseData.articles,
    loading: false
  })
}
}

  render() {
    return (
      <div className='container my-3 '>
        <h2>Top Headline - News</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
         {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
           <NewsItem title={element.title?element.title.slice(0,44):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
           
           </div>
         })} 
           
            
        </div>
        
          <div className="container d-flex justify-content-between">
          
          <button disabled={this.state.page<=1} type='button' className="btn btn-dark" onClick={this.handelPrevClick}>Previous</button>
            
          <button disabled={this.state.page +1 > Math.ceil(this.TotalResults/this.props.pageSize)} type='button' className="btn btn-dark" onClick={this.handelNextClick}>Next</button>
          
          </div>

      </div>
      
    )
  }
}

export default News