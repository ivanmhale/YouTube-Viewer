import Header from './components/header';
import SearchBar from './components/search_bar';
import Videolist from './components/video_list';
import VideoDetail from './components/video_details';
import registerServiceWorker from './registerServiceWorker';
import _ from 'lodash';
import "./index.css";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
const API_KEY = 'AIzaSyDrJ9e6MXeuoBK0JkXhj5eDDr34vy6mOmQ';

class App extends Component{
  constructor(props){
    super(props);

    this.state={
      videos:[],
      selectedVideo: null,
      };

    this.videoSearch('star wars: tie fighter');
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos)=>{
      this.setState({
        videos: videos,
        selectedVideo: videos[0],
      });
    });
  }

  render(){
    const videoSearch=_.debounce((term)=>{this.videoSearch(term)}, 300);
  return (
        <div id="app">
          <Header/>
          <SearchBar onSearchTermChange={videoSearch}/>
          <VideoDetail video={this.state.selectedVideo}/>
          <Videolist
          onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
          videos={this.state.videos}/>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
