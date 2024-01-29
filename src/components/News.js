import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8, 
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  articles = [
    {
      source: {
        id: null,
        name: "Insurance Journal",
      },
      author: "Admin",
      title: "What Does Red Sea Disruption Mean for Europe’s Economy?",
      description:
        "Weeks of attacks by Iranian-backed Houthi militants on vessels in the Red Sea have disrupted shipping in the Suez Canal, the fastest sea route between Asia and Europe, carrying around 15% of global sea trade. For the European economy, already …",
      url: "https://www.insurancejournal.com/news/international/2024/01/23/756864.htm",
      urlToImage:
        "https://www.insurancejournal.com/app/uploads/2024/01/yemeni-coast-guard-affiliated-with-houthi-rebels-getty-scaled.jpg",
      publishedAt: "2024-01-23T16:44:24Z",
      content:
        "Weeks of attacks by Iranian-backed Houthi militants on vessels in the Red Sea have disrupted shipping in the Suez Canal, the fastest sea route between Asia and Europe, carrying around 15% of global s… [+4125 chars]",
    },
    {
      source: {
        id: null,
        name: "gcaptain.com",
      },
      author: "Reuters",
      title: "What Does Red Sea Disruption Mean for Europe’s Economy?",
      description:
        "Jan 23 (Reuters) – Weeks of attacks by Iranian-backed Houthi militants on vessels in the Red Sea have disrupted shipping in the Suez Canal, the fastest sea route between Asia and Europe, carrying around 15% of global sea trade. For the...",
      url: "https://gcaptain.com/what-does-red-sea-disruption-mean-for-europes-economy/",
      urlToImage:
        "https://gcaptain.com/wp-content/uploads/2018/08/shutterstock_757300048.jpg",
      publishedAt: "2024-01-23T16:38:32Z",
      content:
        "Jan 23 (Reuters) – Weeks of attacks by Iranian-backed Houthi militants on vessels in the Red Sea have disrupted shipping in the Suez Canal, the fastest sea route between Asia and Europe, carrying aro… [+4230 chars]",
    },
    {
      source: {
        id: null,
        name: "NPR",
      },
      author: "Andrea Hsu",
      title:
        "Just 1 in 10 workers in the U.S. belonged to labor unions in 2023, a record low",
      description:
        "In 2023, labor unions added 139,000 members, but the share of the workforce that's unionized declined from the year before due to even faster growth in nonunion jobs.",
      url: "https://www.npr.org/2024/01/23/1226034366/labor-union-membership-uaw-hollywood-workers-strike-gallup",
      urlToImage:
        "https://media.npr.org/assets/img/2024/01/23/gettyimages-1540551447_wide-e33f958581ba4cae15a3f809d0b2b60432b7be37-s1400-c100.jpg",
      publishedAt: "2024-01-23T16:30:42Z",
      content:
        "Members of the Writers Guild of America East picket at the Warner Bros. Discovery NYC office on July 13, 2023 in New York City.\r\nMichael M. Santiago/Getty Images\r\nAmid a burst of enthusiasm and energ… [+2537 chars]",
    },
    {
      source: {
        id: null,
        name: "Investing.com",
      },
      author: "U.Today",
      title: "Elon Musk Surprisingly Reacts to Bitcoin's Epic Surge",
      description: "Elon Musk Surprisingly Reacts to Bitcoin's Epic Surge",
      url: "https://www.investing.com/news/cryptocurrency-news/elon-musk-surprisingly-reacts-to-bitcoins-epic-surge-3280894",
      urlToImage: "https://i-invdn-com.investing.com/news/LYNXNPEF310CO_L.jpg",
      publishedAt: "2024-01-23T16:30:33Z",
      content:
        "U.Today - In a significant development for the cryptocurrency market, Yassine Elmandjra, Director of Digital Assets at ARK Invest, recently disclosed that Bitcoin's hash rate has reached an unprecede… [+1407 chars]",
    },
  ];
  constructor() {
    super();
    console.log("IAm a Constructor!");

    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    console.log("cdm");
    let url =
    `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=59208bd4a9a54fabbe7467835005442e&page=1&pageSize=${this.props.pageSize}` ;  
     let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  prevfunc = async () => {
    console.log("Previos");
    console.log("cdm");
    let url = 
    `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=59208bd4a9a54fabbe7467835005442e&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  nextfunc = async () => {
    console.log("Next") ;
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
    } else {
      let url = `
      https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=59208bd4a9a54fabbe7467835005442e&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" >Latest News!!!</h1>
        
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 50) : ""}
                  description={
                    element.description ? element.description.slice(0, 90) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.prevfunc}
          >
            {" "}
            &larr; Previous
          </button>
          <button
          disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.nextfunc}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
