import React from 'react';
import { Link } from 'react-router-dom';

export class VideoList extends React.Component{

    render(){
        const video =  this.props.data;
        return(
            <article className="media">
                <figure className="media-left">
                    
                    <Link to={"/watch/" + video.id.videoId}>
                        <p className="image">
                            <img src={video.snippet.thumbnails.default.url} alt={"youtube-video-thumbnail"}/>
                        </p>
                    </Link>

                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{video.snippet.title.substr(0,50)}...</strong>
                            <br/>
                            <small>{video.snippet.channelTitle}</small>
                        </p>
                    </div>
                </div>
            </article>
        )
    }
}

export class VideoListFull extends React.Component{

    render(){
        const video =  this.props.data;
        return(
            <article className="media">
                <figure className="media-left">
                    
                    <Link to={"/watch/" + video.id.videoId}>
                        <p className="image">
                            <img src={video.snippet.thumbnails.default.url} alt={"youtube-video-thumbnail"}/>
                        </p>
                    </Link>

                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{video.snippet.title}</strong>
                            <br/>
                            <small>{video.snippet.channelTitle}</small>
                            <br/>
                            {video.snippet.description}    
                        </p>
                    </div>
                </div>
            </article>
        )
    }
}

