import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
 import './MovieList.css';
 import { Swiper, SwiperSlide } from 'swiper/react';
 import { Link } from 'react-router-dom';
 import { Button, OutlineBtn } from '../buttons/button';
 import tmdbApi, {category} from '../../Api/tmdbApi';
 import apiConfig from '../../Api/apiConfig';
import { FaThumbsDown } from 'react-icons/fa';
import MovieCard from '../movie-card/MovieCard';

const MovieList = props => {
    const [items, setItems] = useState([]);
    useEffect(() => {
      const getList = async () =>{
        let response = null;
        const params = {};
        if(props.type !== 'similar'){
            switch(props.category){
                case category.movie:
                    response =  await tmdbApi.getMovieList(props.type, {params});
                    break;
                    default:
                        response =  await tmdbApi.getTvList(props.type, {params});
            }
        } else{
            response = await tmdbApi.similar(props.category, props.id)
        }
        setItems(response.results)
      }
    getList();
     
    }, [])
    
  return (
    <div className='movie-list'>
        <Swiper
            grabCursor={true}
            slidesPerView={'auto'}
            spaceBetween={10}

        >
            {
                items.map((item, i)=>(
                    <SwiperSlide key={i}>
                        <MovieCard item={item} category={props.category} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
        
    </div>
  );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired

}

export default MovieList;