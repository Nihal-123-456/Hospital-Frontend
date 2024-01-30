const doctordetail=()=>{
    const param = new URLSearchParams(window.location.search).get("docid")
    displayapptime(param)
    fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    .then((res)=>res.json())
    .then((data)=>displaydetails(data));

    fetch(`https://testing-8az5.onrender.com/doctor/review/?doctor_id=${param}`)
    .then((res)=>res.json())
    .then((data)=>displaydetailreview(data));
};

const displaydetails=(item)=>{
    const parent = document.getElementById("doctor-details")
    const div = document.createElement("div")
    div.classList.add("detail-container")
    div.innerHTML = `
    <div class="detail-img">
        <img class="detail-doc-img" src="${item.image}" alt="">
    </div>
    <div class="detail-txt">
        <h2 class="fw-bold">${item.full_name}</h2>
        <h5 class="fw-bold">${item.designation[0]}</h5>
        <p class="btn btn-outline-success mt-3">
            ${
                item.specialization.map((ele)=>{
                    return ` ${ele} `
                })
            }
        </p>
        <p class="mt-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, maxime.</p>
        <h4 class="fw-bold">Fees: ${item.fee}</h4>
        <button type="button" class="btn btn-outline-warning mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Take Appointment
        </button>
    </div>
    `
    parent.appendChild(div)
}
const displaydetailreview=(data)=>{
    data.forEach((item)=>{
        const parent = document.getElementById("detail-review-slider")
        const div = document.createElement("div")
        div.classList.add("card")
        div.innerHTML=`
        <img src="Images/man-1.jpg" class="doc-img m-auto pt-3" alt="...">
        <div class="card-body">
          <h4 class="card-title">${item.reviewer}</h4>
          <p class="card-text w-75 m-auto">${item.body.slice(0,100)}</p>
          <p><small>${item.rating}</small></p>
        </div>
        `
        parent.appendChild(div)
    })
}
const displayapptime = (doc_id)=>{
    fetch(`https://testing-8az5.onrender.com/doctor/availabletime/?doctor_id=${doc_id}`)
    .then((res)=>res.json())
    .then((data)=>{
        data.forEach((item)=>{
            const parent = document.getElementById("time")
            const option = document.createElement("option")
            option.value = item.id
            option.innerText = item.name
            parent.appendChild(option)
        })
    })
}
const patientinput = () => {
    const param = new URLSearchParams(window.location.search).get("docid")
    const status = document.getElementsByName("status")
    const statusselect = Array.from(status).find((item)=>item.checked)
    const problem = document.getElementById("problem").value
    const time = document.getElementById("time")
    const timeselect = time.options[time.selectedIndex]
    const patient_id = localStorage.getItem("patient_id")
    const info = {
        "appointment_type": statusselect.value,
        "appointment_status": "Running",
        "symptom": problem,
        "cancel": false,
        "patient": patient_id,
        "doctor": param,
        "time": timeselect.value
    }
    
    fetch("https://testing-8az5.onrender.com/appointment/", {
        method: "POST",
        headers: {"content-type":"application/JSON"},
        body: JSON.stringify(info),
    })
    .then((res)=>res.json())
    .then((data) => {
        window.location.href = `pdf.html?docid=${param}`;
        // handlePdf();
        // console.log(data);
      });
}
doctordetail()