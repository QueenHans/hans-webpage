function toggleMode() {
    document.body.classList.toggle('night-mode');
    const button = document.querySelector('.toggle-button');
    if (document.body.classList.contains('night-mode')) {
        button.textContent = 'Day Mode';
    } else {
        button.textContent = 'Night Mode';
    }
}

async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/portfolio');
        const data = await response.json();
        document.getElementById('name').textContent = `Name: ${data.personalInfo.Name}`;
        document.getElementById('birthday').textContent = `Birthday: ${data.personalInfo.Birthday}`;
        document.getElementById('contactNo').textContent = data.personalInfo.ContactNo;

        const experienceSection = document.getElementById('experience');
        data.workExperience.forEach(job => {
            const jobItem = document.createElement('div');
            jobItem.innerHTML = `<h3>${job.designation} - ${job.company} (${job.year})</h3><p>${job.details}</p>`;
            experienceSection.appendChild(jobItem);
        });

        const educationSection = document.getElementById('education');
        data.education.forEach(edu => {
            const eduItem = document.createElement('p');
            eduItem.textContent = `${edu.school} (${edu.year})`;
            educationSection.appendChild(eduItem);
        });

        const skillsSection = document.getElementById('skills');
        data.skills.forEach(skill => {
            const skillItem = document.createElement('p');
            skillItem.textContent = `${skill.description} - ${skill.level}`;
            skillsSection.appendChild(skillItem);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

window.onload = fetchData;