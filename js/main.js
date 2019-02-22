function predict(event) {
    const reader = new FileReader();
    const preview = document.getElementById('output');
    const predict = document.getElementById('predict');
    const file = event.target.files[0]

    reader.addEventListener("load", function () {
        preview.src = reader.result;
        const rawData = reader.result.replace(/^data:image\/[a-z]*;base64,/, "");

        fetch('/function/catsdogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(
                { 'image': rawData }
            )
        })
            .then((response) => response.json())
            .then(json => {
                const isCat = parseFloat(json.cats) > parseFloat(json.dogs);

                predict.innerText = isCat ? "It's a Cat" : "It's a Dog";
            })
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
};