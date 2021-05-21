let savedDates = (localStorage.getItem("savedDates") != null) ? JSON.parse(localStorage.getItem("savedDates")) : [];

$(function () {
    $('#datepicker').datepicker({
        //altFormat: "dd M yy",
        //dateFormat: "dd M yy",
        onSelect: dateText => {
            updateCountdown(dateText);
            addNewDate(dateText);
            storeDate(dateText);
        }
    });

    $(document).on('click', '.saved_date', function () {
        updateCountdown(jQuery(this).text());
    });

    $(document).on('click', '.remove_icon', function () {
        let dateToRemove = $(this).prev().text();
        let index = savedDates.indexOf(dateToRemove);
        if (index >= 0) {
            savedDates.splice(index, 1);
        }

        localStorage.setItem('savedDates', JSON.stringify(savedDates));
        $(this).parent().remove();
    });

    if (savedDates != null) {
        savedDates.sort((a, b) => {
            return new Date(a) - new Date(b);
        });
        savedDates.forEach(e => {
            addNewDate(e);
        });
    }
});

function storeDate(dateText) {
    savedDates.push(dateText);
    localStorage.setItem('savedDates', JSON.stringify(savedDates));
}

function addNewDate(dateText) {
    let newDate = $('<div>' +
        '<div class="saved_date">' + dateText + '</div>' +
        '<span class="remove_icon">X</span>' +
        '</div>')
    $('#saved_dates_list').append(newDate);
}

function updateCountdown(dateText) {
    const currentTime = new Date();
    const diff = Date.parse(dateText) - currentTime;
    const daysLeft = Math.ceil(diff / 1000 / 60 / 60 / 24);
    $('#date').text(dateText);

    if (daysLeft == 1)
        $('#days').text(daysLeft + ' day');
    else
        $('#days').text(daysLeft + ' days');
}
