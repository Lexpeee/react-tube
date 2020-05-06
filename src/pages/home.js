import React from 'react';
import axios from 'axios';
import { youtubeAPIKey } from "./../static"

import VideoCard from './../components/video/videoCard';

class HomePage extends React.Component {
  state = {
    trendingVideos : {
      isLoading : true,
      data : null
    },
      
  }

  getTrendingVideos = async () => {
    const trendingVideos = {...this.state.trendingVideos};
    // let res = await axios.get('videos?part=snippet&chart=mostPopular&maxResults=14&key=AIzaSyDuJ8c2rJhBaSYQARjvIuefWjONlhzt1OM');
    let res = await axios.get("videos",{
      params : {
        part : "snippet",
        chart : "mostPopular",
        maxResults : 10,
        key : youtubeAPIKey
      },
    });
    trendingVideos.isLoading = false;
    trendingVideos.data = res.data.items;
    this.setState({trendingVideos});
  }

  componentDidMount(){
    this.getTrendingVideos();
  }

  render(){

    return (
      <div className="container">
        <section className="section">

            <div className="box">
              <span className="is-size-4">Trending now</span>
              <div className="columns is-multiline">
                {this.state.trendingVideos.isLoading === true ? 
                    <div className="column is-full">
                    <progress className="progress is-primary"></progress>
                    </div>
                  
                  :
                  this.state.trendingVideos.data.map((video, i)=>{
                    return(
                      <div key={i} className="column is-one-fifth">
                        <VideoCard  data={video}/>
                      </div>
                    )
                  })
                }
              
              </div>
            </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
