document.getElementById("name_list").style.visibility = "hidden";

function name_viewer() {
    document.getElementById("name_list").style.visibility = "visible";
}

Webcam.set({
    height: 300,
    width: 400,
    image_format: 'png',
    png_quality: 90
})

cam_1 = document.getElementById("cam_1");

Webcam.attach('#cam_1');

function take_snapshot() {
     Webcam.snap(function(data_uri){
         document.getElementById("cam_2").innerHTML = "<img id='captured_image' src='"+data_uri+"'>";
     })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/BP7CD0k-8/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("object_identification").innerHTML =  result[0].label;
        document.getElementById("accuracy_identification").innerHTML =  result[0].confidence.toFixed(3)*100 + "%";
    }
}