const handlePdf = () => {
    const doctor_id = new URLSearchParams(window.location.search).get("docid");
    console.log(doctor_id);
    const user_id = localStorage.getItem("user_id");
    
    fetch(`https://testing-8az5.onrender.com/doctor/list/${doctor_id}`)
      .then((res) => res.json())
      .then((data) => {
        fetch(`https://testing-8az5.onrender.com/users/${user_id}`)
          .then((res) => res.json())
          .then((pdData) => {
            const newData = [data, pdData];
            
            const parent = document.getElementById("full-pdf-container");
            const div = document.createElement("div");
            div.innerHTML = `
            <div class="d-flex p-5 m-auto justify-content-center w-100">
            <div class="patient-pdf col-6">
                <h3>Patient</h3>
                <div class="card p-4 pdf-detail-card">
                    <p>Name</p><h6 class="fw-bold">${newData[1].first_name} ${newData[1].last_name}</h6 class="fw-bold">
                    <p>Phone</p><h6 class="fw-bold">0182827328</h6 class="fw-bold">
                    <p>Email</p><h6 class="fw-bold">${newData[1].email}</h6 class="fw-bold">
                    <p>Address</p><h6 class="fw-bold">Nandipara, Dhaka</h6 class="fw-bold">
                </div>
            </div>
            
            <div class="doc-pdf col-6">
                <h3>Doctor</h3>
                <div class="card p-4 pdf-detail-card">
                    <p>Name</p><h6 class="fw-bold">${newData[0].full_name}</h6 class="fw-bold">
                    <p>Specialization</p><h6 class="fw-bold">Dental</h6 class="fw-bold">
                    <p>Details</p><h6 class="fw-bold" class="w-50">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, corrupti.</h6 class="fw-bold">
                </div>
            </div>
            </div>
            <h3 class="text-center">Symptoms</h3>
            <div class="d-flex m-auto justify-content-center mb-5">
                <div class="card p-4 w-50 pdf-detail-card fw-bold">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim corrupti, nihil illo atque laborum dolores.
                </div>
            </div>
            <h5 class="text-center">Fees</h5>
            <div class="fees-container card d-flex justify-content-center mb-5 m-auto p-2 fw-bold fst-italic">${newData[0].fee} BDT</div>
            `;
  
              parent.appendChild(div);
              donwloadPdf();
          });
        
      });
  };
  
  const donwloadPdf = () => {
    const element = document.getElementById("full-pdf-container");
  
    // Define the options for html2pdf
    const options = {
      margin: 1,
      filename: "appt.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
  
    // Use html2pdf to generate and download the PDF
      html2pdf(element, options);
      
  };
  handlePdf();
  