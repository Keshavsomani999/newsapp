import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
  apiKey="fb0dbc7f7d2c43649e0706b5f768fb52"
  static defaultProps = {
    country:'in',
    pageSize: 8,
    category: 'general',
    
  }
  static defaultProps = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
    
  }

capitalizeFirstLetter = (string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
      super(props);
   
      this.state = {
        articles : [],
        loading: false,
        page:1,
        

      }
      document.title = `${this.capitalizeFirstLetter (this.props.category)} - News `;
  }
  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=fb0dbc7f7d2c43649e0706b5f768fb52&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
    })
}


async componentDidMount(){
  this.updateNews();
}

handlePrevClick = async () => {
  this.setState({ page: this.state.page - 1 });
  this.updateNews();
}
handleNextClick = async () => {
  this.setState({ page: this.state.page + 1 });
  this.updateNews();
}

  render() {
    return (
      <div className='container my-3 '>
        <h2>Top Headline - News On {this.capitalizeFirstLetter (this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
         {!this.state.loading && this.state.articles.map((element)=>{
          
          return <div className="col-md-4" key={element.url}>
           <NewsItem title={element.title?element.title.slice(0,44):""} india={this.india} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
           
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