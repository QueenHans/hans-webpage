document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch('https://hans-webservice.onrender.com/portfolio');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        updateContent(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateContent(data) {
    document.getElementById('name').innerText = `Name: ${data.personalInfo.Name}`;
    document.getElementById('birthday').innerText = `Birthday: ${data.personalInfo.Birthday}`;
    document.getElementById('gender').innerText = `Gender: ${data.personalInfo.Gender}`;
    document.getElementById('email').innerText = `Email: ${data.personalInfo.Email}`;
    document.getElementById('contactNo').innerText = `Phone: ${data.personalInfo.ContactNo}`;
    document.getElementById('location').innerText = `Location: ${data.personalInfo.Address}`;
    
    const summaryElement = document.getElementById('summary');
    summaryElement.innerText = `A dedicated and motivated web developer with 5 years of experience in creating responsive websites and web applications. Proficient in HTML, CSS, JavaScript, and various front-end frameworks.`;

    const skillsSection = document.getElementById('skills');
    data.skills.forEach(skill => {
        const skillItem = document.createElement('p');
        skillItem.innerText = `${skill.description} - ${skill.level}`;
        skillsSection.appendChild(skillItem);
    });

    const experienceSection = document.getElementById('experience');
    data.workExperience.forEach(job => {
        const jobItem = document.createElement('div');
        jobItem.innerHTML = `<h3>${job.designation} - ${job.company} (${job.year})</h3><p>${job.details}</p>`;
        experienceSection.appendChild(jobItem);
    });

    const educationSection = document.getElementById('education');
    data.education.forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.innerHTML = `<p>${edu.school} (${edu.year})</p>`;
        educationSection.appendChild(eduItem);
    });

    const referencesSection = document.getElementById('references');
    data.personalReferences.forEach(ref => {
        const refItem = document.createElement('div');
        refItem.innerHTML = `<p>${ref.name} - ${ref.relationship} - ${ref.contactNo}</p>`;
        referencesSection.appendChild(refItem);
    });
}
