fetch("C:\Users\Julien\Desktop\P5\FishEyeData.json")
    .then(response => response.json())
    .then(data => {
        console.log(data.sentence)
    })