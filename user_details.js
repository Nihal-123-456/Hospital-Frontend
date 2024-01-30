const LoadUserDetails=()=>{
    user_id = localStorage.getItem('user_id');
    fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
    .then((req)=>req.json())
    .then((data=>{
        const parent = document.getElementById('user-details')
        parent.innerHTML = `
            <img class="user-img" src="Images/man-1.jpg" alt="">
            <div class="user-txt">
                <h2>Username : ${data.username}</h2>
                <h5 class="mt-3">Full Name : ${data.first_name} ${data.last_name}</h5>
                <h4 class="mt-3">Email : ${data.email}</h4>
            </div>
        `
    }))
}
LoadUserDetails()

const LoadAppointment=()=>{
    const patient_id = localStorage.getItem("patient_id")
    fetch(`https://testing-8az5.onrender.com/appointment/?patient_id=${patient_id}`)
    .then((req)=>req.json())
    .then((data)=>{
        data.forEach((item)=>{
            const parent = document.getElementById("appointment-table")
            const child = document.createElement("tr")
            child.innerHTML=`
                <th scope="row">${item.id}</th>
                <td>${item.symptom}</td>
                <td>${item.appointment_type}</td>
                <td>${item.appointment_status}</td>
                ${
                    item.appointment_status=="Pending"?`<td class="text-danger fw-bold">X</td>`:
                    `<td >X</td>`
                }
                <td>${item.doctor}</td>
                <td>500</td>
            `
            parent.appendChild(child)
        })
    })
}
LoadAppointment()

const LoadPatientId=()=>{
    const user_id = localStorage.getItem('user_id')
    fetch(`https://testing-8az5.onrender.com/patient/list/?${user_id}`)
    .then((req)=>req.json())
    .then((data)=>localStorage.setItem("patient_id",data[0].id))
}

LoadPatientId()