document.addEventListener('DOMContentLoaded', function () {
    var outputDiv = document.getElementById('output');
    
    function fetchData() {
        var url = 'http://localhost:3000/';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        console.log(xhr);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    outputDiv.innerHTML = '<p>Status: ' + response.status + '</p>';
                } else {
                    outputDiv.innerHTML = '<p>Error fetching data from the server.</p>';
                }
            }
        };
        xhr.send();
    }

    fetchData();
});
