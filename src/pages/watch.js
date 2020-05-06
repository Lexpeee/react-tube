import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { youtubeAPIKey } from "./../static";

import { VideoList } from './../components/video/videoList';


class WatchPage extends React.Component {
  state = {
    isLoading : true,
    currentVideo : {
      isLoading : true,
      data : null
    },
    searchedRelatedVideos : {
      query : null,
      isLoading : true,
      data : null,
      update : false
    }
  }
  
  loadCurrentVideoData = async id => {
    const currentVideo = {...this.state.currentVideo};
    let res = await axios("videos",{
      params : {
        part : "snippet",
        id : this.props.match.params.id,
        key : youtubeAPIKey
      },
    });
    currentVideo.isLoading = false;
    currentVideo.data = res.data.items[0];
    this.setState({currentVideo});
  }

  // searched videos relative to the current video playing
  searchRelatedVideos = async (id) => {
    const searchedRelatedVideos = {...this.state.searchedRelatedVideos};
    let res = await axios.get('search',{
      params : {
        part : "snippet",
        relatedToVideoId : id,
        type : "video",
        key : youtubeAPIKey,
        maxResults : 7
      }
    })
    searchedRelatedVideos.query = this.props.match.params.q;
    searchedRelatedVideos.isLoading = false;
    searchedRelatedVideos.data = res.data.items;
    searchedRelatedVideos.update = false;
    this.setState({searchedRelatedVideos});
  }

  clearVideoState(){
    const currentVideo = {...this.state.currentVideo};
    currentVideo.isLoading = true;
    currentVideo.data = null;
    this.setState({currentVideo});
  }

  componentDidMount(){
    this.loadCurrentVideoData(this.props.match.params.id);
    this.searchRelatedVideos(this.props.match.params.id);
  }

  // componentDidUpdate(){
  //   this.loadCurrentVideoData(this.props.match.params.id);
  //   this.searchRelatedVideos(this.props.match.params.id);
  // }

  componentWillUnmount(){
    this.clearVideoState()
  }

  render(){
    console.log(this.state.currentVideo)
    return (
      <div className="container">
        <div className="columns">
          <div className="column">
            <iframe width="942" height="530" src={"https://www.youtube.com/embed/" + this.props.match.params.id + "?autoplay=1"} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            {this.state.currentVideo.data === null ?
              <span className="is-size-4">Loading Title..</span>
            :
              <>
                <strong>
                  <span className="is-size-4">{this.state.currentVideo.data.snippet.title}</span>
                </strong><br/>
                <p>{"Channel: " + this.state.currentVideo.data.snippet.channelTitle}</p>
              </>
            }
          </div>
          <div className="column">
            <span className="is-size-4">Related Videos</span>
            
            <article className="media">
              <div className="media-content">
                {this.state.searchedRelatedVideos.isLoading === true ? 
                  <div className="content">Loading...</div>
                :
                  <div className="content">
                    {this.state.searchedRelatedVideos.data.map((video,i)=>{
                      return(
                        <div key={i}>
                          <VideoList data={video} />
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
    );
  }
}

export default WatchPage;
