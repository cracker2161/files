# Footer

<div id="footer-container"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://raw.githubusercontent.com/cracker2161/files/main/others/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error:', error));
});
</script>

<hr>
