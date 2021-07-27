import axios from "axios";

//we have defined a asynchronous function to download a image and then change the background for this we have first created promises for the asynchronous partsand then written await in front of them when using in the async function
//if we do not write await then function execute normally as any other js function
export async function change_wallpaper(req_page,id) {
    
    // we have written await to wait for the promise to resolve
    await axios.get(process.env.REACT_APP_API_DOMAIN +"/getwall", { params: { page: req_page } })
    .then(async (url)=>{
        //when image is downloaded then only the promise is resolve and
        await download_image(url.data);
        //then only the background image gets changed
        document.getElementById(id).style.backgroundImage = "url(" + url.data + ")";
    });

    // let url = "https://images.unsplash.com/photo-1569402928543-87a35efc0606?ixid=Mnw5ODI5M3wwfDF8YWxsfHx8fHx8fHx8MTYyNDU5NzQyOA&ixlib=rb-1.2.1&fit=crop&q=80&w=1920&h=1080";
    // let url = "https://images.unsplash.com/photo-1601047656464-f4e7621681bf?ixid=MnwyMzkyOTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjM3NzUwOTY&ixlib=rb-1.2.1&fit=crop&q=80&w=1920&h=1080";
    
}

export function download_image(url) {
    return new Promise((resolve, reject) => {
        let image_b = new Image();
        image_b.src = url;
        image_b.onload = () => resolve();
    });
}

export function percentage_time_left() {
    let curr = new Date();
    curr = (curr.getHours() - 9) * 60 + curr.getMinutes();
    let p = Math.floor((curr / 480) * 100);
    return p > 100 ? "+" + (p - 100).toString() : p.toString();
}

export function getUser(user, setUser) {
    return new Promise(async (resolve, reject) => {
        let data = await axios
            .get(process.env.REACT_APP_API_DOMAIN + "/getuser", {
                withCredentials: true,
            })
            .catch((err) => {
                console.log(err);
                setUser(null);
                resolve();
            });
            // data = undefined;
        if(data!==undefined)
        {
            if (data.data !== "User not authenticated") {
                setUser(data.data);
            }
        } else setUser(null);
        resolve();
    });
}
