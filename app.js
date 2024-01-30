const loadservice = () =>{
    fetch("https://testing-8az5.onrender.com/services/")
    .then((res)=>res.json())
    .then((data)=>displayservice(data))
    .catch((err)=>console.log(err));
};

const displayservice = (data) =>{
    data.forEach((ele) => {
        const parent = document.getElementById("service-slider");
        const list = document.createElement("li");
        list.innerHTML = `
        <div class="card shadow h-100">
        <div class="ratio ratio-16x9">
            <img src="${ele.image}" class="card-img-top" loading="lazy" alt="...">
        </div>
        <div class="card-body  p-3 p-xl-5">
            <h3 class="card-title h5">${ele.name}</h3>
            <p class="card-text">${ele.description.slice(0,150)}</p>
            <a href="#" class="btn btn-primary">View Details</a>
        </div>
    </div>
    `;
    parent.appendChild(list);
    });
};
loadservice();

const loaddoctor=(search)=>{
    document.getElementById("doctors-list").innerHTML=`
    <div id="spinner" class="spinner">
        <h4>loading....</h4>
    </div>
    `
    fetch(`https://testing-8az5.onrender.com/doctor/list/?search=${
        search ? search : ""}`)
    
    .then((req)=>req.json())
    .then((data)=>{
        if (data.results.length>0){
            document.getElementById("spinner").style.display="none";
            displaydoctor(data.results)
        }
        else{
            document.getElementById("spinner").style.display="none";
            document.getElementById("doctors-list").innerHTML=`
            <div id="nodata-img" class="nodata-img">
                <img src="Images/nodata.png" alt="">
            </div>
            `
        }
    })
    .catch((err)=>console.log(err));
};

const displaydoctor=(data)=>{
    data.forEach((ele)=>{
        const parent =document.getElementById("doctors-list");
        const list = document.createElement("div");
        list.classList.add("card");
        list.innerHTML = `
        <img src="${ele.image}" class="doc-img m-auto pt-3" alt="...">
        <div class="card-body p-3">
          <h4 class="card-title">${ele.full_name}</h4>
          <h5>${ele.designation[0]}</h5>
          <p>
            ${ele.specialization.map((it)=>{
                return `<button class="btn btn-warning" >${it}</button>`
            })}
          </p>
          <a target="_blank" class="btn btn-primary" href="docdetail.html?docid=${ele.id}">View Details</a>
        </div>
        `;
        parent.appendChild(list);
    })
};
loaddoctor();

const loaddesignation=()=>{
    fetch('https://testing-8az5.onrender.com/doctor/designation/')
    .then((req)=>req.json())
    .then((data)=>{
        data.forEach((ele)=>{
            const parent = document.getElementById('desig')
            const list = document.createElement('li')
            list.classList.add("dropdown-item")
            list.innerHTML=`
                <li onclick="loaddoctor('${ele.name}')" >${ele.name}</li>
            `
            parent.appendChild(list);
        });
    });
};
const loadspecialization=()=>{
    fetch('https://testing-8az5.onrender.com/doctor/specialization/')
    .then((req)=>req.json())
    .then((data)=>{
        data.forEach((ele)=>{
            const parent = document.getElementById('speci')
            const list = document.createElement('li')
            list.classList.add("dropdown-item")
            list.innerHTML=`
                <li onclick="loaddoctor('${ele.name}')" >${ele.name}</li>
            `
            parent.appendChild(list);
        });
    });
}

loaddesignation();
loadspecialization();

const searchresult=()=>{
    const search = document.getElementById("searchbar").value
    loaddoctor(search)
}
const reviewdisplay=()=>{
    fetch("https://testing-8az5.onrender.com/doctor/review/")
    .then((res)=>res.json())
    .then((data)=>{
        data.forEach((item)=>{
            const parent = document.getElementById("review-slider")
            const div = document.createElement("div")
            div.classList.add("card")
            div.innerHTML=`
            <img src="Images/man-1.jpg" class="doc-img m-auto pt-3" alt="...">
            <div class="card-body">
              <h4 class="card-title">${item.reviewer}</h4>
              <p class="card-text w-75 m-auto">${item.body.slice(0,100)}</p>
              <h5><small>${item.rating}</small></h5>
            </div>
            `
            parent.appendChild(div)
        })
    })
}
reviewdisplay();