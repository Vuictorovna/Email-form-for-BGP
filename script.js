document.addEventListener('DOMContentLoaded', () => {
    const postcodeInput = document.getElementById('postcode');
    const emailButton = document.getElementById('emailButton');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');

    function fetchContactDetails(memberId, mpName) {
        fetch(`https://members-api.parliament.uk/api/Members/${memberId}/Contact`)
        .then(response => response.json())
        .then(data => {
            if (data.value && data.value.length > 0) {
                const email = data.value[0].email;
                const firstName = encodeURIComponent(firstNameInput.value.trim());
                const lastName = encodeURIComponent(lastNameInput.value.trim());
                const mailtoLink = `mailto:${email}?subject=Message%20to%20${mpName}&body=Dear%20${mpName},%0A%0A[Your%20message%20here.]%0A%0ARegards,%0A${firstName}%20${lastName}`;
                window.location.href = mailtoLink;
            }
        });
    }

    emailButton.addEventListener('click', () => {
        const query = encodeURIComponent(postcodeInput.value.trim());

        fetch(`https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${query}&skip=0&take=1`)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const mpInfo = data.items[0].value.currentRepresentation.member.value;
                const mpName = mpInfo.nameDisplayAs;
                const memberId = mpInfo.id;

                fetchContactDetails(memberId, mpName);
            }
        });
    });
});
