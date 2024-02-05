import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../App.css'

const Leagues = () => {
    const [data,setData] = useState([]);

    useEffect(()=>{
        axios('thesportsdb.com/api/v1/json/3/all_leagues.php').then(res=>{
            console.log(res.data);
        })
    },[])

  return (
    <div className='leagues-container'>
        Leagues
    </div>
  )
}

export default Leagues