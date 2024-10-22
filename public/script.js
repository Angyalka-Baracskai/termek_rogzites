const backendurl = "localhost:3000";

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("submit").addEventListener("click",async function(){
        fetch(backendurl)
        .then(response => response.json())
        .then(data => Datafutar(data));
    });
    document.getElementById('form').addEventListener('submit', async (event) => {
        event.preventDefault(); 
        const megnevezes = document.getElementById('megnevezes').value;
        const egysegar = document.getElementById('egysegar').value;
        const egyseg = document.getElementById('egyseg').value;
        const mennyiseg = document.getElementById('mennyiseg').value;
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ megnevezes, mennyiseg, egysegar, egyseg })
        });
    
        const data = await response.json();
        const resultDiv = document.getElementById('table');
    });
    function Datafutar(data){
        let table=`<table>
            <thead>
                <tr>
                    <th>Megnevezés</th>
                    <th>Egységár</th>
                    <th>Egység</th>
                    <th>Mennyiség</th>
                </tr>
            </thead>
            <tbody>
            `;
            for (let i = 0; i < data.length; i++) {
                table += `<tr>
                    <td>${data[i].megnevezes}</td>
                    <td>${data[i].egysegar}</td>
                    <td>${data[i].egyseg}</td>
                    <td>${data[i].mennyiseg}</td>
                </tr>`;
            }
            table += `</tbody></table>`;
        document.getElementById("table").innerHTML = table;
    };
});

