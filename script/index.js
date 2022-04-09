const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];
const months = ["Januari", "Februari", "Maret", "April", "Mai", "Juni","Juli", "Augustus", "September", "Oktober", "November", "Desember"];


const jadwalContainer = document.getElementById("jadwal");
const locationContainer = document.getElementById("location");

function showTime(){
    const d = new Date();
    const h = d.getHours(); 
    const m = d.getMinutes(); 
    const s = d.getSeconds(); 
    const dayName = days[d.getDay()]; 
    const date = d.getDate(); 
    const monthName = months[d.getMonth()]; 
    const year = d.getFullYear(); 
    
    const time = h + ":" + m + ":" + s;
    const fullDate = dayName + ", " + date + " " + monthName + " " + year;
    document.getElementById("clock").innerText = time;
    document.getElementById("clock").textContent = time;
    document.getElementById("date").innerText = fullDate;
    
    setTimeout(showTime, 1000);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error)
    } else { 
        console.log("Geolocation is not supported by this browser.")
    }
}

function success(position) {
    const URL = `https://api.pray.zone/v2/times/today.json?longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`

    fetch(URL)
        .then((response) => {
            return response.json()
        })
        .then(res => {
            const data = res.results.datetime[0].times
            tabelJadwal(data)
        })
        .catch(err => {
            console.log(err)
        });
    
    jadwal.classList.remove('hidden');
    locationContainer.classList.add('hidden');
}

function error(err) {
    alert('Anda tidak memberikan akses lokasi!')
}

function tabelJadwal(data) {
    const {Imsak, Fajr, Dhuhr, Asr, Maghrib, Isha} = data
    const tabelTemplate = `
            <table id="jadwalTabel" class="w-full md:w-3/4 table-fixed mx-auto mb-8 mt-6 text-[20px] md:text-[24px] text-white">    
                <tr>
                    <td class="py-2">Imsak</td>
                    <td class="text-right">${Imsak}</td>
                </tr>
                <tr>
                    <td class="py-2">Subuh</td>
                    <td class="text-right">${Fajr}</td>
                </tr>
                <tr>
                    <td class="py-2">Dzuhur</td>
                    <td class="text-right">${Dhuhr}</td>
                </tr>
                <tr>
                    <td class="py-2">Ashar</td>
                    <td class="text-right">${Asr}</td>
                </tr>
                <tr>
                    <td class="py-2">Maghrib</td>
                    <td class="text-right">${Maghrib}</td>
                </tr>
                <tr>
                    <td class="py-2">Isha</td>
                    <td class="text-right">${Isha}</td>
                </tr>
            </table>
    `

    jadwalContainer.innerHTML += tabelTemplate;
}

showTime();