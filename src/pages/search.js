import React from 'react';
import axios from 'axios';
import { youtubeAPIKey } from "./../static";

import { VideoListFull } from './../components/video/videoList';

// let res = await axios.get('');
// return res;
// GET https://www.googleapis.c<article class="media">

class SearchPage extends React.Component {  
  state = {
    searchedVideos : {
      query : null,
      isLoading : true,
      data : null,
      update : false
    }
  }
  
  searchVideos = async () => {
    const searchedVideos = {...this.state.searchedVideos};
    let res = await axios.get('search',{
      params : {
        part : "snippet",
        type : "video",
        videoType : "any",
        q : this.props.match.params.q,
        key : youtubeAPIKey,
        maxResults : 12
      }
    })
    searchedVideos.query = this.props.match.params.q;
    searchedVideos.isLoading = false;
    searchedVideos.data = res.data.items;
    searchedVideos.update = false;
    this.setState({searchedVideos});
  }


  componentDidMount(){
    this.searchVideos();
  }
  
  componentDidUpdate(){
    this.searchVideos();
  }

  render(){
    return (
      <div className="container">
        <p>Search results for "{this.state.searchedVideos.query}"</p>
        <div className="box">
          <div className="container">
            <article className="media">
              <div className="media-content">
                {this.state.searchedVideos.isLoading === true ? 
                  <div className="content">Loading...</div>
                :
                  <div className="content">
                    {this.state.searchedVideos.data.map((video,i)=>{
                      return(
                        <div key={i}>
                          <VideoListFull data={video} />
                        </div>
                      )
                    })}
                  </div>
                }

              </div>

            </article>
          </div>
        </div>
      </div>

    )
  }
}

export default SearchPage;
