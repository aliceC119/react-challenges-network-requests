import React, { Component } from "react";
import css from "./css/Content.module.css";
import {savedPosts} from "../posts.json";
import PostItem from "./PostItem";
import Loader from "./Loader";
import axios from 'axios';
import APY_KEY from "../secrets";

export class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false
        }
        
    }

    componentDidMount() {
        this.fetchImages();  
    }

    async fetchImages() {
        const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&per_page=100&safesearch=true&editors_choice=true&orientation=horizontal`);
        const fetchedPosts = response.data.hits;

        this.setState({
            isLoaded: true,
            posts: fetchedPosts,
            savedPosts: fetchedPosts,
        })
    }
    
    handleChange = (e) => {
        const name = e.target.value.toLowerCase();
        const filteredPosts = this.state.savedPosts.filter((post)=>{
            return post.user.toLowerCase().inclused(name);
        })
    }
    render() {
        return (
            <div className={css.Content}>
                
                <div className={css.TitleBar}>
                    <h1>My Photos</h1>
                </div>

                <div className={css.SearchResults}>
                    {
                        this.state.isLoaded ?
                        <PostItem savedPosts={savedPosts} />
                        : <Loader />

                    }

                    {/* Part 1: Creating the map function */}

                        {/* {
                    savedPosts.map((post)=>{
                            return <div className={css.SearchItem} key={post.title}>
                                <p>{post.title}</p>
                                <p>{post.name}</p>
                                <img src={post.image} alt="random"/>
                                <p>{post.description}</p>
                                </div>
                        })
                    } */}


                    {/* Part 2: Creating a child component */}

                    
                </div>
            </div>
        )
    }
}

export default Content