function appendImageElem(keyword, index) {
    const imgElem =  document.createElement('img');  
    // imgElem.src = 'https://source.unsplash.com/400x225/?' + keyword +'&sig=' +index;
    // versionใหม่ทำงี้ -v- "+" แทนด้วย ${}
    imgElem.src = `https://source.unsplash.com/400x225/?${keyword}&sig=${index}`

    const galleryElem = document.querySelector('.gallery');
    galleryElem.appendChild(imgElem);
}

function removePhoto() {
    const galleryElem = document.querySelector('.gallery');
    galleryElem.innerHTML ='';
    //remove old photo
}
function searchPhotos(event){
    const keyword = event.target.value;
    // console.log(keyword);
    if(event.key === 'Enter' && keyword){
        removePhoto();
        for(let i =1; i<=9;i++){
            appendImageElem(keyword, i);
        }
    }
}
function run() {
    // appendImageElem('dog', 1);
    // appendImageElem('dog', 2);
    // appendImageElem('dog', 3);
    
    const inputElem = document.querySelector('input');
    inputElem.addEventListener('keydown', searchPhotos);
}

run();