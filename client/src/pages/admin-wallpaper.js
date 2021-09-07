import {React,useState,} from 'react'
import axios from 'axios'
import './Welcome.css'

export default function AdminWallpaper() {
    const [Count, setCount] = useState(1);
    const [Query, setQuery] = useState();
    const [Images,setImages] = useState();
    const [Indexes, setIndexes] = useState({});
    const [Success, setSuccess] = useState(null);

    const getSelectedImages = ()=>{
        return new Promise((resolve,reject)=>{
            let selectedImages = Object.keys(Indexes);
            selectedImages = selectedImages.map(element=>{ return {id:Images[element].id,urls:{raw:Images[element].urls.raw}}});
            // console.log(selectedImages);
            if(selectedImages.length>0)
                resolve(selectedImages);
            else
                reject();
        })
        }


    const handleSubmit = (e)=>{
        e.preventDefault();
        setSuccess(null);
        setImages(null);
        if(Count!=null && Count>0 && Count<31 && Count!=""&& Count!=undefined)
        {
            axios.post(process.env.REACT_APP_API_DOMAIN +"/getadminwallpaper",{
                count:Count,
                query:Query?.length>30?Query.substr(0,30):Query
            },
            {withCredentials:true}
            ).then(response=>{
                // console.log(response.data);
                if(response.data!="Invalid")
                    setImages(response.data);
            }).catch(err=>{
                console.log(err);
            })  
        }      
    }

    const handlePhotoSubmit =(e)=>{
        e.preventDefault();
        getSelectedImages().then(
            selectedImages=>{
                axios.post(process.env.REACT_APP_API_DOMAIN +"/adminwallpaper",{
                    images:selectedImages
                },
                {withCredentials:true}
                ).then(response=>{
                    setSuccess(response.data);
                }).catch(err=>{
                    console.log(err);
                })
            }
        ).catch(err=>{
            console.log(err);
        })  
    }
    const handleChange =(e)=>{
        if(e.target.checked)
        {
            setIndexes(prev=>{
                prev[e.target.value] = 1;
                return prev;
            })
        }
        else
        {
            setIndexes(prev=>{
                delete prev[e.target.value];
                return prev;
            })
        }
    }

    return (
        <div>
        {Success && <h2>{Success}</h2>}
            <form onSubmit={handleSubmit}>
                <input onChange={(e)=>{
                    setCount(e.target.value);
                }} 
                    placeholder="count"
                type="text"/>
                <br/>
                <input onChange={(e)=>{
                    setQuery(e.target.value);
                }} 
                    placeholder="query"
                type="text"/>
                <br/>
                <input type="submit"></input>
                <br/>
            </form>
            <form onSubmit={handlePhotoSubmit}>
            {Images && Images.map((image,index)=>{
                let url = image.urls.regular 
                
                return <div key={index}>
                        <input type="checkbox" onChange ={handleChange} name="image" value={index}></input>
                        <div style={{display:'inline-block',width:"1080px",height:"720px", backgroundImage:`url(${url})`}}>
                            <p className="welcome_time" style={{textAlign:"center"}}>
                                50
                                <span id="welcome_subscript">%</span>
                            </p>
                            <p style={{ flexGrow: "1",textAlign:"center" }} className="welcome_greeting">
                                Just Do It
                            </p>
                        </div>
                        <br/>
                        </div>
            })}
            <br/>
            <input type="submit"></input>
            </form>
            
        </div>
    )
}
