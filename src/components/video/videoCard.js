import React from 'react';
import { Link } from 'react-router-dom';

class VideoCard extends React.Component{

    render(){
        const video =  this.props.data;
        // console.log(video)
        return(
            <Link to={"watch/" + video.id}>
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src={video.snippet.thumbnails.standard.url} alt={"youtube-video-thumbnail"}/>
                        </figure>
                    </div>
                    <div className="card-content">
                        <p>
                            {video.snippet.title.length >= 50 ? video.snippet.title.substr(0,50) + "..." : video.snippet.title }
                        </p>
                        {/* <p>{video.snippet.title.substr(0,50)}..</p> */}
                    </div>
                </div>
            </Link>
        )
    }
}

export default VideoCard;