document.getElementById('githubForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const resultDiv = document.getElementById('result');

    if (!username) {
        resultDiv.innerHTML = "<p class='text-danger'>Please enter a username.</p>";
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            const creationDate = new Date(data.created_at);
            const creationDateUTC = creationDate.toISOString().slice(0, 10);
            resultDiv.innerHTML = `<p>Account Creation Date: <strong>${creationDateUTC}</strong></p>`;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p class='text-danger'>Error: ${error.message}</p>`;
        });
});